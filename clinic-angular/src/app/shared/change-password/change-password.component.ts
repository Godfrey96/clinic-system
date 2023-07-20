import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;
  isSubmitted = false;
  responseMessage: any;
  changetype: boolean = true;
  visible: boolean = true;
  changetypeNew: boolean = true;
  visibleNew: boolean = true;
  changetypeConfirm: boolean = true;
  visibleConfirm: boolean = true;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this._initChangePasswordForm();
  }

  private _initChangePasswordForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  validatePassword() {
    if (
      this.changePasswordFormError['newPassword'].value !=
      this.changePasswordFormError['confirmPassword'].value
    )
      return true;
    else return false;
  }

  onSubmit() {
    this.ngxService.start();
    this.isSubmitted = true;

    const data = {
      oldPassword: this.changePasswordFormError['oldPassword'].value,
      newPassword: this.changePasswordFormError['newPassword'].value,
      confirmPassword: this.changePasswordFormError['confirmPassword'].value,
    };

    console.log('Data: ' + data.oldPassword);

    this.userService.changePassword(data).subscribe(
      (res: string) => {
        this.ngxService.stop();
        console.log('res-passwod: ', res);
        if (!res) return;
        // this.responseMessage = res;
        this.notificationService.showSuccess(
          'Password changed successfully',
          'SUCCESS'
        );
        this.changePasswordForm.reset();
      },
      (error) => {
        this.ngxService.stop();
        console.log('error.status: ', error.status);
        if (error.status === 400) {
          this.responseMessage = this.notificationService.showError(
            'Incorrect Old Password',
            'BAD REQUEST'
          );
          // this.changePasswordForm.reset();
          return;
        } else if (error.status === 200) {
          this.notificationService.showSuccess(
            'Password changed successfully',
            'SUCCESS'
          );
          this.changePasswordForm.reset();
          return;
        }
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          console.log('data-error: ', error);

          console.log('ERROR: ', error);
          // this.notificationService.showSuccess(
          //   'Password changed successfully',
          //   'SUCCESS'
          // );
        }

        this.notificationService.showError(
          'Failed to change password',
          'ERROR'
        );
      }
    );
  }

  // errors
  get changePasswordFormError() {
    return this.changePasswordForm.controls;
  }

  //eye icon
  viewOldPassword() {
    this.visible = !this.visible;

    this.changetype = !this.changetype;
  }

  viewNewPassword() {
    this.visibleNew = !this.visibleNew;

    this.changetypeNew = !this.changetypeNew;
  }

  viewConfirmPassword() {
    this.visibleConfirm = !this.visibleConfirm;

    this.changetypeConfirm = !this.changetypeConfirm;
  }
}
