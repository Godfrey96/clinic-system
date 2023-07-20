import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  currentLoggedInUser!: any;
  currentLoggedInRole!: any;

  constructor(
    public authService: AuthService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    // this._getLoggedInUser();
    // this._getCurrentUserRole();
  }

  // _getLoggedInUser() {
  //   this.currentLoggedInUser = this.userService.isLoggedIn()
  //   console.log('this.currentLoggedInUser: ', this.currentLoggedInUser)
  // }

  // _getCurrentUserRole() {
  //   this.authService.getUserRole()[0].roleName;
  //   console.log('this._getCurrentUserRole: ', this.authService.getUserRole()[0].roleName)
  // }

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
}
