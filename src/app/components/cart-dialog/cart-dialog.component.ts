import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CartsService } from '../../services/carts.service';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-cart-dialog',
  templateUrl: './cart-dialog.component.html',
  styleUrls: ['./cart-dialog.component.sass'],
})
export class CartDialogComponent {
  cartForm!: FormGroup;
  submitted: boolean | undefined;

  constructor(
    private cartsService: CartsService,
    private formBuilder: FormBuilder,
    public dialogRef: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.cartForm = this.formBuilder.group({
      userId: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.submitted = true;
    const cart: Cart = this.cartForm?.value;
    this.cartsService.addCart(cart).subscribe(
      (response: Cart) => {
        console.log('Cart created:', response);
        this.cartForm?.reset();
        this.dialogRef.close(cart);
      },
      (error) => {
        console.error('Error creating cart:', error);
      }
    );
  }
}
