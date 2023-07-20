import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentLoggedInUser!: string;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this._getLoggedInUser();
  }

  _getLoggedInUser() {
    this.currentLoggedInUser = this.userService.isLoggedIn();
    console.log('this.currentLoggedInUser: ', this.currentLoggedInUser);
  }

  bookAppointmentBtn() {
    this.router.navigate(['/login/login']);
  }
}
