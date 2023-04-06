import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass'],
  providers: [MessageService],
})
export class UserDetailsComponent {
  user?: User;
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(switchMap((params: ParamMap) => this.loadUser(params.get('id'))))
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  private loadUser(id: string | null) {
    if (id == null) {
      throw new Error();
    }
    return this.usersService.getUser(id);
  }

  onSaveEditedUser(id: number | undefined) {
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

  onOpenCarts(id: number | undefined) {
    // this.usersService.getUserCarts(id).subscribe((carts) => {});
    let route = `/users/${id}/carts`;
    this.router.navigate([route]);
  }
}
