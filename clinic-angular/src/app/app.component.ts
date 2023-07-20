import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentLoggedInUser!: string;
  currentLoggedInRole!: string;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this._getLoggedInUser();
    this._getCurrentUserRole();
  }

  _getLoggedInUser() {
    this.currentLoggedInUser = this.userService.isLoggedIn();
    // console.log('this.currentLoggedInUser: ', this.currentLoggedInUser);
  }

  _getCurrentUserRole() {
    this.authService.getUserRole()[0].roleName;
    console.log(
      'this._getCurrentUserRole: ',
      this.authService.getUserRole()[0].roleName
    );
  }

  isUserAdmin(): boolean {
    if (this.userService.isLoggedIn()) {
      const userRoles = this.authService.getUserRole();
      if (
        userRoles &&
        userRoles.length > 0 &&
        userRoles[0].roleName === 'ADMIN'
      ) {
        return true;
      }
    }
    return false;
  }

  isUserReception(): boolean {
    if (this.userService.isLoggedIn()) {
      const userRoles = this.authService.getUserRole();
      if (
        userRoles &&
        userRoles.length > 0 &&
        userRoles[0].roleName === 'RECEPTION'
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
}
