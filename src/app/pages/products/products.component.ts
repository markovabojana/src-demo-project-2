import { Component } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { PaginationRequest } from '../../models/PaginationRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass'],
})
export class ProductsComponent {
  products: Product[] = [];

  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  totalRecords: number = 100;

  constructor(
    private productService: ProductsService,
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
}
