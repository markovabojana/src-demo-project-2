import { Component } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { Cart } from '../../models/cart';
import {
  ConfirmationService,
  ConfirmEventType,
  LazyLoadEvent,
  MessageService,
} from 'primeng/api';
import { PaginationRequest } from '../../models/PaginationRequest';
import { Router } from '@angular/router';
import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CartDialogComponent } from '../../components/cart-dialog/cart-dialog.component';
import { User } from '../../models/user';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.sass'],
  providers: [MessageService, DialogService, ConfirmationService],
})
export class CartsComponent {
  carts: Cart[] = [];

  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  totalRecords: number = 100;

  ref: DynamicDialogRef | undefined;

  constructor(
    private cartsService: CartsService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public dialogService: DialogService
  ) {}

  ngOnInit() {
    this.cartsService.getCarts().subscribe((cartsResponse) => {
      this.carts = cartsResponse.carts;
    });
  }

  getInventoryStatus(stock: number) {
    if (stock == 0) {
      return this.status[0];
    } else if (stock > 0 && stock < 10) {
      return this.status[2];
    } else {
      return this.status[1];
    }
  }

  onLazyLoad(event: LazyLoadEvent) {
    if (event.first == undefined || event.rows == undefined) {
      return;
    }
    // if (event.globalFilter != undefined) {
    //   this.productService
    //     .searchProducts(
    //       event.globalFilter,
    //       new PaginationRequest(event.first, event.rows)
    //     )
    //     .subscribe((productsResponse) => {
    //       this.products = productsResponse.products;
    //       this.totalRecords = productsResponse.total;
    //     });
    // } else {
    this.cartsService
      .getCarts(new PaginationRequest(event.first, event.rows))
      .subscribe((cartsResponse) => {
        this.carts = cartsResponse.carts;
        this.totalRecords = cartsResponse.total;
      });
    // }
  }

  // viewProduct(product: Product) {
  //   let route = '/products/';
  //   this.router.navigate([route, product.id]);
  // }
  viewCart(cart: any) {
    let route = '/carts/';
    this.router.navigate([route, cart.id]);
  }

  show() {
    this.ref = this.dialogService.open(CartDialogComponent, {
      header: 'Add a new cart',
      data: 'yes',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe((cart: Cart) => {
      if (cart) {
        this.carts.unshift(cart);

        this.messageService.add({
          severity: 'info',
          summary: 'New cart added!',
        });
      }
    });

    this.ref.onMaximize.subscribe((value) => {
      this.messageService.add({
        severity: 'info',
        summary: 'Maximized',
        detail: `maximized: ${value.maximized}`,
      });
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  onDeleteCart(cart: Cart) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete cart with ' + cart.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-primary',
      rejectButtonStyleClass: 'p-button-secondary',
      accept: () => {
        this.cartsService.deleteCart(cart.id).subscribe((cart) => {
          if (cart.isDeleted) {
            this.carts = this.carts?.filter((val) => val.id !== cart.id);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Cart successfully Deleted',
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
