import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  firstName!: String | undefined;
  lastName: String | undefined;

  constructor(
    private authService: AuthService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userDetails();
  }

  userDetails() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.firstName = user.firstName;
    this.lastName = user.lastName;
    console.log('First name ', this.firstName);
    console.log('First name ', this.lastName);
  }

  logout() {
    this.ngxService.start();
    this.authService.logout();
    this.notificationService.showSuccess('Logout successfully', 'SUCCESS');
    this.ngxService.stop();
  }
}
