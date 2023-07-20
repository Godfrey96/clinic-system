import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RegisterRequestDto } from 'src/app/models/register-request-dto';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-receptionist',
  templateUrl: './add-receptionist.component.html',
  styleUrls: ['./add-receptionist.component.css'],
})
export class AddReceptionistComponent implements OnInit {
  addReceptionistForm!: FormGroup;
  isSubmitted: boolean = false;
  responseMessage: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private adminService: AdminService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.addReceptionistFormInit();
  }

  addReceptionistFormInit() {
    this.addReceptionistForm = this.fb.group({
      email: this.fb.control(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.compose([Validators.required])),
    });
  }

  proceedAddReceptionist() {
    if (this.addReceptionistForm.valid) {
      this.ngxService.start();
      this.isSubmitted = true;
      const user: RegisterRequestDto = {
        firstName: this.addReceptionFormError['firstName'].value,
        lastName: this.addReceptionFormError['lastName'].value,
        email: this.addReceptionFormError['email'].value,
        password: this.addReceptionFormError['password'].value,
      };
      this.adminService.addNewReceptionist(user).subscribe(
        (response: any) => {
          this.ngxService.stop();
          this.responseMessage = response?.message;
          this.notificationService.showSuccess(
            'Receptionist added successfully',
            'SUCCESS'
          );
          this.addReceptionistForm.value.clear;
          this.router.navigate(['/admin-reception']);
        },
        (error: any) => {
          this.ngxService.stop();
          this.notificationService.showError(
            'Failed to add a reception',
            'ERROR'
          );
        }
      );
    } else {
      this.notificationService.showError('Please fill all the field', 'ERROR');
    }
  }

  //errors
  get addReceptionFormError() {
    return this.addReceptionistForm.controls;
  }
}
