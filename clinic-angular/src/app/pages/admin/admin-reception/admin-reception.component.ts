import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AdminService } from 'src/app/services/admin.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NotificationService } from 'src/app/services/notification.service';
import { Reception } from 'src/app/models/reception';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-reception',
  templateUrl: './admin-reception.component.html',
  styleUrls: ['./admin-reception.component.css'],
})
export class AdminReceptionComponent {
  reception: Reception[] = [];
  updateReceptionForm!: FormGroup;
  isSubmitted: boolean = false;
  receptionId!: number;

  visible: boolean = false;

  position: string = 'top';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private adminService: AdminService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this._updateReceptionistFormInit();
    this.loadReceptionists();
  }

  private _updateReceptionistFormInit() {
    this.updateReceptionForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
    });
  }

  loadReceptionists() {
    this.adminService.getAllReceptionists().subscribe((res: User[]) => {
      this.reception = res;
    });
  }

  addReceptionist() {
    this.router.navigate(['/admin-reception/add-receptionist']);
  }

  showDialog(position: string, userId: number) {
    this.position = position;
    this.visible = true;

    console.log('userId: ', userId);

    this.adminService.getUserById(userId).subscribe((reception: Reception) => {
      this.updateFormError['firstName'].setValue(reception.firstName);
      this.updateFormError['lastName'].setValue(reception.lastName);
      this.updateFormError['email'].setValue(reception.email);
      this.updateFormError['contactNo'].setValue(reception.contactNo);
    });
  }

  updateReception() {
    this.ngxService.start();
    this.isSubmitted = true;
    this.visible = false;

    const reception: Reception = {
      firstName: this.updateFormError['firstName'].value,
      lastName: this.updateFormError['lastName'].value,
      email: this.updateFormError['email'].value,
      contactNo: this.updateFormError['contactNo'].value,
    };

    console.log('reception-update: ', reception);

    this.adminService.updateReception(reception).subscribe(
      (res: Reception) => {
        console.log('res: ', res);
        this.ngxService.stop();
        location.reload();
        this.loadReceptionists();
        this.notificationService.showSuccess(
          'Receptionist details updated successfully',
          'SUCCESS'
        );
      },
      (error) => {
        this.ngxService.stop();
        this.notificationService.showError(
          'Error while updating reception',
          'ERROR'
        );
      }
    );
  }

  deleteReception(userId: number) {
    console.log('userId: ', userId);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this Reception!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes.',
      cancelButtonText: 'No',
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      this.ngxService.start();
      if (result.value) {
        Swal.fire('Delete!', 'User deleted successfully.', 'success');
        this.adminService.deleteReception(userId).subscribe({
          next: () => {
            this.ngxService.stop();
            this.notificationService.showSuccess(
              'Deleted successfully',
              'SUCCESS'
            );
            this.loadReceptionists();
            location.reload();
          },
          error: (error) => {
            if (error.status === 200) {
              this.notificationService.showSuccess(
                'Deleted successfully',
                'SUCCESS'
              );
              this.loadReceptionists();
          
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
    return this.updateReceptionForm.controls;
  }
}
