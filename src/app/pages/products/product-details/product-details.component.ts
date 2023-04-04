import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MessageService } from 'primeng/api';
import { switchMap } from 'rxjs';
import { Product } from '../../../models/product';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass'],
  providers: [MessageService],
})
export class ProductDetailsComponent {
  product?: Product;
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.loadProduct(params.get('id'))))
      .subscribe((product: Product) => {
        this.product = product;
      });
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
}
