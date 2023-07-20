import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthenticationRequest } from 'src/app/models/authentication-request';
import { AuthenticationResponse } from 'src/app/models/authentication-response';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  public showPassword: boolean = false;
  loginForm!: FormGroup;
  isSubmitted: boolean = false;

  changetype: boolean = true;

  visible: boolean = true;
  viewPassword() {
    this.visible = !this.visible;
    this.changetype = !this.changetype;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.ngxService.start();
    this.isSubmitted = true;

    const user: AuthenticationRequest = {
      email: this.loginFormError['email'].value,
      password: this.loginFormError['password'].value,
    };

    if (user != null) {
      console.log('valied - ', user);
    } else {
      console.log('not valied');
    }

    this.authService.login(user).subscribe(
      (response: AuthenticationResponse) => {
        this.ngxService.stop();
        console.log('respon: ', response);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response?.token);
        localStorage.setItem('roles', JSON.stringify(response.user.roles));

        const role = response.user.roles[0].roleName;

        if (this.userService.isLoggedIn() && role === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']);
        } else if (this.userService.isLoggedIn() && role === 'DOCTOR') {
          this.router.navigate(['/doctor-dashboard']);
          // this.router.navigate(['/doctor-appointments']);
        } else if (this.userService.isLoggedIn() && role === 'RECEPTION') {
          this.router.navigate(['/receptionist-appointments']);
        } else if (this.userService.isLoggedIn() && role === 'PATIENT') {
          this.router.navigate(['/view-appointments']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        this.ngxService.stop();
        if (error.status == 403) {
          this.notificationService.showError(
            'User not found in our system',
            'ERROR'
          );
        } else if (error.status == 400) {
          this.notificationService.showError(error.error, 'ERROR');
        } else {
          this.ngxService.stop();
          console.log('error: ', error);
        }
      }
    );
  }

  // errors
  get loginFormError() {
    return this.loginForm.controls;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
