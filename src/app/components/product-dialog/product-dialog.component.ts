import { Component, Inject } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.sass'],
})
export class ProductDialogComponent {
  productForm!: FormGroup;
  submitted: boolean | undefined;

  constructor(
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    public dialogRef: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.submitted = true;
    const product: Product = this.productForm?.value;
    this.productsService.addProduct(product).subscribe(
      (response: Product) => {
        console.log('Product created:', response);
        this.productForm?.reset();
        this.dialogRef.close(product);
      },
      (error) => {
        console.error('Error creating product:', error);
      }
    );
  }
}
