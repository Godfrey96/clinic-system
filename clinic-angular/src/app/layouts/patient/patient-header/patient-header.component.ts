import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PatientService } from 'src/app/services/patient.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.css'],
})
export class PatientHeaderComponent {
  patient: User | undefined;

  constructor(
    private authService: AuthService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService,
    private patientService: PatientService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getSingleUser().subscribe((res: User) => {
      this.patient = res;
    });
  }

  logout() {
    this.ngxService.start();
    this.authService.logout();
    this.notificationService.showSuccess('Logout successfully', 'SUCCESS');
    this.ngxService.stop();
  }
}
