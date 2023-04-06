import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';
import { switchMap } from 'rxjs';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/products.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass'],
  providers: [MessageService, ConfirmationService],
})
export class ProductDetailsComponent {
  product?: Product;
  isEditing: boolean = false;
  responsiveOptions: any;
  images!: string[];
  products: Array<Product> = [];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.loadProduct(params.get('id'))))
      .subscribe((product: Product) => {
        this.product = product;
        this.images = product.images;
      });

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 5,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
      },
    ];
  }

  private loadProduct(id: string | null) {
    if (id == null) {
      throw new Error();
    }
    return this.productsService.getProduct(id);
  }

  onSaveEditedProduct(id: number | undefined) {
    this.isEditing = false;
    // this.usersService.updateUser(id, this.user).subscribe((updatedUser) => {
    //   // this.loadUser()
    // });
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Successfully edited user!',
    });
  }

  onDeleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-primary',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.productsService.deleteProduct(product.id).subscribe((product) => {
          if (product.isDeleted) {
            this.products = this.products?.filter(
              (val) => val.id !== product.id
            );
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product successfully Deleted',
              life: 3000,
            });
          }
        });
      },
      reject: (type: any) => {
        switch (type) {
          case ConfirmEventType.REJECT:
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Operation canceled',
            });
        }
      },
    });
  }
}
