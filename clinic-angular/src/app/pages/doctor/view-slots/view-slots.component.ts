import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/models/doctor';
import { Slot } from 'src/app/models/slot';
import { SlotService } from 'src/app/services/slot.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-slots',
  templateUrl: './view-slots.component.html',
  styleUrls: ['./view-slots.component.css'],
})
export class ViewSlotsComponent implements OnInit {
  slots!: Slot[];
  // doctor: Doctor | undefined;
  doctorId: any;

  constructor(
    private slotService: SlotService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    // this.getAvailableSlotByDoctorId()
  }

  getCurrentUser() {
    this.userService.getSingleUser().subscribe((res: Doctor) => {
      // this.doctor = res;
      this.doctorId = res.userId;
      this.getAvailableSlotByDoctorId();
    });
  }

  getAvailableSlotByDoctorId() {
    console.log('doctor-id: ', this.doctorId);
    this.slotService
      .getAvailableSlotsByDoctor(this.doctorId)
      .subscribe((res: Slot[]) => {
        console.log('res-slots: ', res);
        this.slots = res;
      });
  }

  // getAvailableSlot() {
  //   this.slotService.getAllAvailableSlots().subscribe((res: any) => {
  //     console.log('slots: ', res);
  //     this.slots = res;
  //   })
  // }

  addSlot() {
    this.router.navigate(['/add-slot']);
  }
}
