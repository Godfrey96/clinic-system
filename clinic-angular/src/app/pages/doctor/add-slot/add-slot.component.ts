import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Doctor } from 'src/app/models/doctor';
import { Slot } from 'src/app/models/slot';
import { SlotRequest } from 'src/app/models/slot-request';
import { DoctorService } from 'src/app/services/doctor.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SlotService } from 'src/app/services/slot.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css'],
})
export class AddSlotComponent implements OnInit {
  addSlotForm!: FormGroup;
  isSubmitted: boolean = false;
  doctorId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private slotService: SlotService,
    private doctorService: DoctorService,
    private userService: UserService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this._updateSlotFormInit();
    this.getDoctor();
  }

  _updateSlotFormInit() {
    this.addSlotForm = this.fb.group({
      sessionDuration: ['', Validators.required],
    });
  }

  getDoctor() {
    this.userService.getSingleUser().subscribe((res: Doctor) => {
      console.log('res-doctor: ', res);
      this.doctorId = res.userId;
      console.log('this.doctorId : ', this.doctorId);
    });
  }

  addSlotSubmit() {
    this.ngxService.start();
    this.isSubmitted = true;

    const slot: SlotRequest = {
      sessionDuration: this.slotFormError['sessionDuration'].value,
      doctorId: this.doctorId,
    };

    console.log('slot-requst: ', slot);

    this.slotService.createSlot(slot).subscribe(
      (res: Slot) => {
        console.log('res: ', res);
        this.ngxService.stop();
        this.notificationService.showSuccess(
          'Slot added successfully',
          'SUCCESS'
        );
        this.router.navigate(['/view-slots']);
      },
      (error) => {
        this.ngxService.stop();
        if (error.status === 200) {
          this.notificationService.showSuccess(
            'Slot added successfully',
            'SUCCESS'
          );
          this.router.navigate(['/view-slots']);
          return;
        }
        if (error.status === 400) {
          this.notificationService.showError(
            'Error while updating reception',
            'ERROR'
          );
          return;
        }
      }
    );
  }

  // errors
  get slotFormError() {
    return this.addSlotForm.controls;
  }
}
