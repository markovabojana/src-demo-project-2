import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Cart } from '../../../models/cart';
import { CartsService } from '../../../services/carts.service';
import { ProductsService } from '../../../services/products.service';
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'app-user-carts',
  templateUrl: './user-carts.component.html',
  styleUrls: ['./user-carts.component.sass'],
  providers: [MessageService],
})
export class UserCartsComponent {
  products: Array<Product> = Array.of();
  carts: Array<Cart> = Array.of();
  cart?: Cart;
  obj: Product[] = [];

  constructor(
    private usersService: UsersService,
    private cartsService: CartsService,
    private productsService: ProductsService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.loadProduct(params.get('id'))))
      .subscribe((cartsResponse) => {
        this.products = cartsResponse.carts.flatMap((cart) => cart.products);
      });
  }

  onRemoveProduct(product: Product) {
    this.productsService.deleteProduct(product.id).subscribe((product) => {
      if (product.isDeleted) {
        this.products = this.products?.filter((val) => val.id !== product.id);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product successfully Deleted',
          life: 3000,
        });
      }
    });
  }

  private loadProduct(id: string | null) {
    if (id == null) {
      throw new Error();
    }
    return this.usersService.getUserCarts(id);
  }

  onRowSelection(event: any) {
    let route = '/products/';
    this.router.navigate([route, event.data.id]);
  }
}
