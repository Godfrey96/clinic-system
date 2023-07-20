import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';
import { ApmodalComponent } from './apmodal/apmodal.component';
import { Patient } from 'src/app/models/patient';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Reception } from 'src/app/models/reception';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-patient',
  templateUrl: './admin-patient.component.html',
  styleUrls: ['./admin-patient.component.css'],
})
export class AdminPatientComponent implements OnInit {
  user: Patient[] = [];
  updatePatientForm!: FormGroup;
  isSubmitted: boolean = false;
  receptionId!: number;

  visible: boolean = false;

  position: string = 'top';

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this._updatePatientFormInit();
    this.loadPatients();
  }

  private _updatePatientFormInit() {
    this.updatePatientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
    });
  }

  loadPatients() {
    this.adminService.getAllPatients().subscribe((res: Patient[]) => {
      this.user = res;
    });
  }

  showDialog(position: string, userId: number) {
    this.position = position;
    this.visible = true;

    console.log('userId: ', userId);

    this.adminService.getUserById(userId).subscribe((patient: Patient) => {
      this.updateFormError['firstName'].setValue(patient.firstName);
      this.updateFormError['lastName'].setValue(patient.lastName);
      this.updateFormError['email'].setValue(patient.email);
      this.updateFormError['contactNo'].setValue(patient.contactNo);
    });
  }

  updatePatient() {
    this.ngxService.start();
    this.isSubmitted = true;
    this.visible = false;

    const patient: Patient = {
      firstName: this.updateFormError['firstName'].value,
      lastName: this.updateFormError['lastName'].value,
      email: this.updateFormError['email'].value,
      contactNo: this.updateFormError['contactNo'].value,
    };

    console.log('patient-update: ', patient);

    this.adminService.updatePatient(patient).subscribe(
      (res: Patient) => {
        console.log('res: ', res);
        this.ngxService.stop();
        location.reload();
        this.loadPatients();
        this.notificationService.showSuccess(
          'Patient details updated successfully',
          'SUCCESS'
        );
      },
      (error) => {
        this.ngxService.stop();
        this.notificationService.showError(
          'Error while updating patient',
          'ERROR'
        );
      }
    );
  }

  deletePatient(userId: number) {
    console.log('userId: ', userId);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this Patient!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes.',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      this.ngxService.start();
      if (result.value) {
        Swal.fire('Delete!', 'User deleted successfully.', 'success');
        this.adminService.deletePatient(userId).subscribe({
          next: () => {
            this.ngxService.stop();
            this.notificationService.showSuccess(
              'Deleted successfully',
              'SUCCESS'
            );
            location.reload();
            this.loadPatients();
          },
          error: (error) => {
            if (error.status === 200) {
              this.notificationService.showSuccess(
                'Deleted successfully',
                'SUCCESS'
              );
              this.loadPatients();
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
    return this.updatePatientForm.controls;
  }
}
