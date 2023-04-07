import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
declare var google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig) {}

  title = 'demo-project';

  isLoggedIn: boolean = localStorage.getItem('token') != undefined;

  ngOnInit() {
    this.primengConfig.ripple = true;

    if (!this.isLoggedIn) {
      this.logIn();
    }
  }

  async handleCredentialResponse(response: any) {
    console.log(response);
    localStorage.setItem('token', response.credential);
    location.reload();
  }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.disableAutoSelect();
    location.reload();
  }

  private logIn() {
    google.accounts.id.initialize({
      client_id:
        '43911688021-vhvor2ceecg5gknm89qcgjgvhcqvfpuo.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });

    google.accounts.id.renderButton(document.getElementById('google-button'), {
      theme: 'outline',
      size: 'large',
    });
    google.accounts.id.prompt();
  }
}
