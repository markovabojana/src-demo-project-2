import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { PaginationRequest } from '../../models/PaginationRequest';
import { ConfirmEventType, LazyLoadEvent } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
  displayModal: boolean = false;
  totalRecords: number = 0;

  activityValues: Array<number> = [0, 100];

  filteredColumns: Array<string> = ['firstName', 'lastName', 'birthDate'];

  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
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
    this.loading = false;

    let localFilter = this.filteredColumns.find(
      (column) =>
        // @ts-ignore
        event.filters[column] != undefined &&
        // @ts-ignore
        event.filters[column][0].value != undefined
    );

    if (localFilter) {
      let filterMap = new Map<string, string>();
      // @ts-ignore
      let filterValue = event.filters[localFilter][0].value;

      this.usersService
        .filterUsers(filterMap.set('lastName', filterValue))
        .subscribe((users) => {
          this.users = users.users;
          this.totalRecords = users.total;
          this.loading = false;
        });
    } else if (event.globalFilter != undefined) {
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

  onDeleteUser(user: User) {
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

  onRowSelection(event: any) {
    let route = '/users/';
    this.router.navigate([route, event.data.id]);
  }

  onAddUser() {
    this.displayModal = true;
  }

  onSubmit(event: MouseEvent) {
    this.displayModal = false;
    this.usersService.addUser(this.user!!);
  }
}
