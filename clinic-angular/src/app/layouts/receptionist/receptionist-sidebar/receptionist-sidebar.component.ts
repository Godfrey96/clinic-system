import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-receptionist-sidebar',
  templateUrl: './receptionist-sidebar.component.html',
  styleUrls: ['./receptionist-sidebar.component.css']
})
export class ReceptionistSidebarComponent implements OnInit {
  firstName!: String | undefined;
  lastName: String | undefined;
  email :string | undefined;
  constructor(
    private authService: AuthService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.userDetails();
  }

  userDetails() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
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
