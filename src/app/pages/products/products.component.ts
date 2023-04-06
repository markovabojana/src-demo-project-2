import { Component } from '@angular/core';
import {
  ConfirmationService,
  LazyLoadEvent,
  MessageService,
  SelectItem,
} from 'primeng/api';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { PaginationRequest } from '../../models/PaginationRequest';
import { Router } from '@angular/router';
import { UserDialogComponent } from '../../components/user-dialog/user-dialog.component';
import { User } from '../../models/user';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductDialogComponent } from '../../components/product-dialog/product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
  providers: [MessageService, DialogService, ConfirmationService],
})
export class ProductsComponent {
  products: Product[] = [];

  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  totalRecords: number = 100;

  ref: DynamicDialogRef | undefined;

  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService
      .getProducts()
      .subscribe((data) => (this.products = data.products));
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
    if (event.globalFilter != undefined) {
      this.productService
        .searchProducts(
          event.globalFilter,
          new PaginationRequest(event.first, event.rows)
        )
        .subscribe((productsResponse) => {
          this.products = productsResponse.products;
          this.totalRecords = productsResponse.total;
        });
    } else {
      this.productService
        .getProducts(new PaginationRequest(event.first, event.rows))
        .subscribe((productsResponse) => {
          this.products = productsResponse.products;
          this.totalRecords = productsResponse.total;
        });
    }
  }

  viewProduct(product: Product) {
    let route = '/products/';
    this.router.navigate([route, product.id]);
  }

  filterGlobal(inputValue: string, rows: number, first: number) {
    if (inputValue == '') {
      this.productService
        .getProducts(new PaginationRequest(first, rows))
        .subscribe((data) => {
          this.products = data.products;
          this.totalRecords = data.total;
        });
    }
    // @ts-ignore
    this.productService
      .searchProducts(inputValue, new PaginationRequest(first, rows))
      .subscribe((productsResponse) => {
        this.products = productsResponse.products;
        this.totalRecords = productsResponse.total;
      });
  }

  show() {
    this.ref = this.dialogService.open(ProductDialogComponent, {
      header: 'Add a new product',
      data: 'yes',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
    });

    this.ref.onClose.subscribe((product: Product) => {
      if (product) {
        this.products.unshift(product);

        this.messageService.add({
          severity: 'info',
          summary: 'New product added!',
          detail: product.title,
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
}
