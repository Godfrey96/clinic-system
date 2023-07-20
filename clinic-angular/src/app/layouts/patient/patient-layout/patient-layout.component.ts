import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-patient-layout',
  templateUrl: './patient-layout.component.html',
  styleUrls: ['./patient-layout.component.css'],
})
export class PatientLayoutComponent implements OnInit {
  constructor(
    public authService: AuthService,
    public userService: UserService
  ) {}

  ngOnInit(): void {}

  isUserPatient(): boolean {
    if (this.userService.isLoggedIn()) {
      const userRoles = this.authService.getUserRole();
      if (
        userRoles &&
        userRoles.length > 0 &&
        userRoles[0].roleName === 'PATIENT'
      ) {
        return true;
      }
    }
    return false;
  }

  isUserDoctor(): boolean {
    if (this.userService.isLoggedIn()) {
      const userRoles = this.authService.getUserRole();
      if (
        userRoles &&
        userRoles.length > 0 &&
        userRoles[0].roleName === 'DOCTOR'
      ) {
        return true;
      }
    }
    return false;
  }
}
