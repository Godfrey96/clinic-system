import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationService } from 'src/app/services/notification.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
})
export class DoctorDashboardComponent implements OnInit {
  updateDoctorForm!: FormGroup;

  visible: boolean = false;

  position: string = 'top';

  doctor: Doctor[] = [];
  doctorId!: number;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private doctorService: DoctorService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
    this._updateDoctorFormInit();
  }

  loadDoctors() {
    this.adminService.getAllDoctors().subscribe((res: Doctor[]) => {
      this.doctor = res;
    });
  }

  private _updateDoctorFormInit() {
    this.updateDoctorForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
    });
  }

  addDoctor() {
    this.router.navigate(['/admin-doctor/add-doctor']);
  }

  showDialog(position: string, userId: number) {
    this.position = position;
    this.visible = true;

    this.doctorId = userId;
    console.log('this.doctorId: ', this.doctorId);

    this.adminService.getUserById(userId).subscribe((doctor: Doctor) => {
      this.updateFormError['firstName'].setValue(doctor.firstName);
      this.updateFormError['lastName'].setValue(doctor.lastName);
      this.updateFormError['email'].setValue(doctor.email);
      this.updateFormError['contactNo'].setValue(doctor.contactNo);
    });
  }

  updateDoctor() {
    this.ngxService.start();
    this.isSubmitted = true;
    this.visible = false;

    const doctor: Doctor = {
      firstName: this.updateFormError['firstName'].value,
      lastName: this.updateFormError['lastName'].value,
      email: this.updateFormError['email'].value,
      contactNo: this.updateFormError['contactNo'].value,
    };

    console.log('doctor-update: ', doctor);

    this.adminService.updateDoctor(doctor).subscribe(
      (res: Doctor) => {
        console.log('res: ', res);
        this.ngxService.stop();
        this.loadDoctors();
        this.notificationService.showSuccess(
          'Doctor details updated successfully',
          'SUCCESS'
        );
      },
      (error) => {
        this.ngxService.stop();
        this.notificationService.showError(
          'Error while updating doctor',
          'ERROR'
        );
      }
    );
  }

  deleteDoctor(userId: number) {
    console.log('delete-user-id: ', userId);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this doctor!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes.',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      this.ngxService.start();
      if (result.value) {
        Swal.fire('Delete!', 'User deleted successfully.', 'success');
        this.adminService.deleteUser(userId).subscribe({
          next: () => {
            this.ngxService.stop();
            this.notificationService.showSuccess(
              'Deleted successfully',
              'SUCCESS'
            );
            this.loadDoctors();
          },
          error: (error) => {
            if (error.status === 200) {
              this.notificationService.showSuccess(
                'Deleted successfully',
                'SUCCESS'
              );
              this.loadDoctors();
              return;
            }
          },
        });
        this.ngxService.stop();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.ngxService.stop();
        Swal.fire('Cancelled', 'User not deleted.', 'error');
      }
    });
  }

  // errors
  get updateFormError() {
    return this.updateDoctorForm.controls;
  }
}
