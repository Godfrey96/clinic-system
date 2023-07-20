import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { User } from 'src/app/models/user';
import { DoctorService } from 'src/app/services/doctor.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-doctor-sidebar',
  templateUrl: './doctor-sidebar.component.html',
  styleUrls: ['./doctor-sidebar.component.css'],
})
export class DoctorSidebarComponent implements OnInit {
  doctor: Doctor | undefined;

  constructor(
    private doctorService: DoctorService,
    private authService: AuthService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.userService.getSingleUser().subscribe((res: Doctor) => {
      console.log('res:L ', res);
      this.doctor = res;
      this.doctor.firstName = res.firstName;
      this.doctor.lastName = res.lastName;
    });
  }

  logout() {
    this.ngxService.start();
    this.authService.logout();
    this.notificationService.showSuccess('Logout successfully', 'SUCCESS');
    this.ngxService.stop();
  }
}
