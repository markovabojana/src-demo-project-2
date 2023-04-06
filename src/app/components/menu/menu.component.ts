import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  activeItem!: MenuItem;

  ngOnInit() {
    this.items = [
      {
        label: 'Users',
        icon: 'pi pi-users',
        routerLink: ['/users'],
      },
      {
        label: 'Products',
        icon: 'pi pi-box',
        routerLink: ['/products'],
      },
      {
        label: 'Carts',
        icon: 'pi pi-shopping-cart',
        routerLink: ['/carts'],
      },
    ];
    this.activeItem = this.items[0];
  }

  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}
