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

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.sass'],
})
export class UserDialogComponent {
  userForm!: FormGroup;
  submitted: boolean | undefined;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    public dialogRef: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.submitted = true;
    const user: User = this.userForm?.value;
    this.usersService.addUser(user).subscribe(
      (response: User) => {
        console.log('User created:', response);
        this.userForm?.reset();
        this.dialogRef.close(user);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
}
