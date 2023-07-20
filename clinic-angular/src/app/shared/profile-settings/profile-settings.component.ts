import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Route, Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css'],
})
export class ProfileSettingsComponent implements OnInit {
  profileForm!: FormGroup;
  isSubmitted: boolean = false;
  responseMessage: any;
  role: any;
  patient!: User;
  userId: any;

  temPatient!: User;
  email!: string;
  firstName!: string;
  lastName!: string;
  contactNo!: string;
  address!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private patientService: PatientService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.editProfileFormInit();
  }

  editProfileFormInit() {
    this.profileForm = this.fb.group({
      email: this.fb.control(this.email, Validators.required),
      firstName: this.fb.control(this.firstName, Validators.required),
      lastName: this.fb.control(this.lastName, Validators.required),
      contactNo: this.fb.control(this.contactNo, Validators.required),
      address: this.fb.control(this.address, Validators.required),
    });
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    this.userService.getSingleUser().subscribe((res: User) => {
      this.userId = res.userId;
      this.profileFormError['email'].setValue(res.email);
      this.profileFormError['firstName'].setValue(res.firstName);
      this.profileFormError['lastName'].setValue(res.lastName);
      this.profileFormError['contactNo'].setValue(res.contactNo);
      this.profileFormError['address'].setValue(res.address);
    });
  }

  saveProfile() {
    this.ngxService.start();
    this.isSubmitted = true;

    const user: User = {
      email: this.profileFormError['email'].value,
      firstName: this.profileFormError['firstName'].value,
      lastName: this.profileFormError['lastName'].value,
      contactNo: this.profileFormError['contactNo'].value,
      address: this.profileFormError['address'].value,
    };

    this.userService.updateProfile(this.userId, user).subscribe(
      (res: User) => {
        console.log('res-: ', res);
        this.ngxService.stop();
        this.notificationService.showError(this.responseMessage, 'ERROR');
      },
      (error) => {
        this.ngxService.stop();
        if (error.status === 400) {
          this.responseMessage = this.notificationService.showError(
            'Something went wrong',
            'BAD REQUEST'
          );

          return;
        }
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.notificationService.showSuccess(
            'User updated successfully',
            'SUCCESS'
          );
        }
      }
    );
  }

  //errors
  get profileFormError() {
    return this.profileForm.controls;
  }
}
