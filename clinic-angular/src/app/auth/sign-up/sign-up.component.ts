import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RegisterRequestDto } from 'src/app/models/register-request-dto';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import Validation from 'src/app/utils/validation';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  changeTypePassword: boolean = true;
  visiblePassword: boolean = true;
  changeTypeConfirmPassword: boolean = true;
  visibleConfirmPassword: boolean = true;
  hide: boolean = true;

  viewPassword() {
    this.visiblePassword = !this.visiblePassword;
    this.changeTypePassword = !this.changeTypePassword;
  }

  viewConfirmPassword() {
    this.visibleConfirmPassword = !this.visibleConfirmPassword;
    this.changeTypeConfirmPassword = !this.changeTypeConfirmPassword;
  }

  isSubmitted: boolean = false;
  responseMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.registerFormInit();
  }

  // password verify with confirm password method
  passwordVerify(passwordValue: string, confirmPasswordValue: string) {
    return (FormGroup: FormGroup) => {
      const passwordField = FormGroup.controls[passwordValue];
      const confirmPasswordField = FormGroup.controls[confirmPasswordValue];
      if (
        confirmPasswordField.errors &&
        !confirmPasswordField.errors['passwordVerify']
      ) {
        return;
      }
      if (passwordField.value !== confirmPasswordField.value) {
        confirmPasswordField.setErrors({ passwordVerify: true });
        console.log('passwords dont match');
      } else {
        confirmPasswordField.setErrors(null);
        console.log('passwords match');
      }
    };
  }

  passwordsVerify() {
    if (
      this.signUpForm.value.password === this.signUpForm.value.confirmPassword
    ) {
      return true;
    } else {
      return false;
    }
  }

  registerFormInit() {
    this.signUpForm = this.fb.group(
      {
        email: this.fb.control(
          '',
          Validators.compose([Validators.required, Validators.email])
        ),
        firstName: this.fb.control('', Validators.required),
        lastName: this.fb.control('', Validators.required),
        password: this.fb.control(
          '',
          Validators.compose([Validators.required, Validators.minLength(8)])
        ),
        confirmPassword: this.fb.control(
          '',
          Validators.compose([Validators.required])
        ),
      },
      // password verify with confirm password
      // { validators: Validation.match('password', 'confirmPassword') }
      { validators: this.passwordVerify('password', 'confirmPassword') }
    );
  }

  proceedRegistration() {
    this.ngxService.start();
    this.isSubmitted = true;

    const user: RegisterRequestDto = {
      firstName: this.signUpFormError['firstName'].value,
      lastName: this.signUpFormError['lastName'].value,
      email: this.signUpFormError['email'].value,
      password: this.signUpFormError['password'].value,
    };

    console.log('RegisterRequestDto: ', user);

    this.authService.register(user).subscribe(
      (response) => {
        this.ngxService.stop();
        this.notificationService.showSuccess(
          'Account created successfully',
          'SUCCESS'
        );
        this.router.navigate(['/success']);
      },
      (error) => {
        this.ngxService.stop();
        if (error.status == 201) {
          this.notificationService.showSuccess(
            'Account registered successfully',
            'SUCCESS'
          );
          this.router.navigate(['/success']);
        } else if (error.status == 403) {
          this.notificationService.showError(error.error, 'ERROR');
        } else if (error.status == 400) {
          this.notificationService.showError(error.error, 'ERROR');
        } else if (error.status == 500) {
          this.notificationService.showError(error.error, 'ERROR');
        } else {
          this.ngxService.stop();
          console.log('error: ', error);
        }
      }
    );
    // } else {
    //   this.notificationService.showError('Email already exists', 'ERROR');
    // }
  }

  // errors
  // get signUpFormError() {
  //   return this.signUpForm.controls;
  // }

  get signUpFormError(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }

  validatePassword(password: string) {
    var pe =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}/;
    return pe.test(password);
  }

  validateEmail(email: string) {
    var em = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return em.test(email);
  }
}
