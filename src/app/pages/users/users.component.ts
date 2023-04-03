import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { PaginationRequest } from '../../models/PaginationRequest';
import { ConfirmEventType, LazyLoadEvent } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.sass'],
  providers: [MessageService, ConfirmationService],
})
export class UsersComponent implements OnInit {
  users: Array<User> = Array.of();
  selectedUsers: Array<User> = Array.of();
  user?: User;

  statuses: Array<any> = Array.of();

  loading: boolean = true;
  totalRecords: number = 0;

  activityValues: Array<number> = [0, 100];

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers().subscribe((usersResponse) => {
      this.users = usersResponse.users;
      this.totalRecords = usersResponse.total;
    });
  }

  onLazyLoad(event: LazyLoadEvent) {
    if (event.first == undefined || event.rows == undefined) {
      return;
    }

    if (event.globalFilter != null) {
      this.usersService
        .searchUsers(
          event.globalFilter,
          new PaginationRequest(event.first, event.rows)
        )
        .subscribe((users) => {
          this.users = users.users;
          this.totalRecords = users.total;
          this.loading = false;
        });
    } else {
      this.usersService
        .getUsers(new PaginationRequest(event.first, event.rows))
        .subscribe((users) => {
          this.users = users.users;
          this.totalRecords = users.total;
          this.loading = false;
        });
    }
  }

  editUser(user: User) {
    this.user = { ...user };
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.firstName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(user.id).subscribe((user) => {
          if (user.isDeleted) {
            this.users = this.users?.filter((val) => val.id !== user.id);
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'User successfully Deleted',
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
