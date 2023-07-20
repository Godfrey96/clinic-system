import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  currentLoggedInUser!: any;
  currentLoggedInRole!: any;

  constructor(
    public authService: AuthService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this._getLoggedInUser();
    this._getCurrentUserRole();
  }

  _getLoggedInUser() {
    this.currentLoggedInUser = this.userService.isLoggedIn();
    // console.log('this.currentLoggedInUser: ', this.currentLoggedInUser)
  }

  _getCurrentUserRole() {
    this.authService.getUserRole()[0].roleName;
    // console.log('this._getCurrentUserRole: ', this.authService.getUserRole()[0].roleName)
  }
}
