import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Appointments } from 'src/app/models/appointments';
import { Doctor } from 'src/app/models/doctor';
import { Slot } from 'src/app/models/slot';
import { AdminService } from 'src/app/services/admin.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SlotService } from 'src/app/services/slot.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receptionist-appointments',
  templateUrl: './receptionist-appointments.component.html',
  styleUrls: ['./receptionist-appointments.component.css'],
})
export class ReceptionistAppointmentsComponent implements OnInit {
  appointmentForm!: FormGroup;
  appointments: Appointments[] = [];
  doctors!: Doctor[];
  slots!: Slot[];
  statuses: string[] = ['Pending', 'Approved'];
  appointmentId!: number;
  isSubmitted: boolean = false;

  visible: boolean = false;

  position: string = 'top';

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private adminService: AdminService,
    private slotService: SlotService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appointmentFormInit();
    this.loadAppointments();
    this.getAvailableDoctors();
    this.getAvailableSlots();
  }

  appointmentFormInit() {
    this.appointmentForm = this.fb.group({
      doctorId: ['', Validators.required],
      slotId: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  loadAppointments() {
    this.appointmentService
      .getAllAppointments()
      .subscribe((res: Appointments[]) => {
        this.appointments = res;

        console.log('Results ', res);
      });
  }

  getAvailableDoctors() {
    this.adminService.getAllDoctors().subscribe((doctor: Doctor[]) => {
      console.log('doctors: ', doctor);
      this.doctors = doctor;
    });
  }

  getSlots() {
    const doctorId = this.appointmentForm.value?.doctorId;
    console.log('doctorId: ', doctorId);

    this.slotService.getAvailableSlotsByDoctor(doctorId).subscribe((slot) => {
      console.log('slots-slots: ', slot);
      this.slots = slot;
    });
  }

  getAvailableSlots() {
    this.slotService.getAllAvailableSlots().subscribe((slot: Slot[]) => {
      console.log('slots: ', slot);
      this.slots = slot;
    });
  }

  showDialog(position: string, appointmentId: number) {
    this.position = position;
    this.visible = true;

    this.appointmentId = appointmentId;

    console.log('appointmentId: ', appointmentId);
  }

  submitAppointment() {
    this.ngxService.start();
    this.isSubmitted = true;
    this.visible = false;

    const doctorId = this.appointmentForm.value?.doctorId;
    const slotId = this.appointmentForm.value?.slotId;
    const status = this.appointmentForm.value?.status;

    this.appointmentService
      .assignAppointmentSlotToDoctor(
        this.appointmentId,
        slotId,
        doctorId,
        status
      )
      .subscribe(
        (res) => {
          this.ngxService.stop();

          console.log('Results: ', res);
          this.notificationService.showSuccess(
            'Appointment assigned successfully!',
            'SUCCESS'
          );

          this.appointmentForm.reset();
          this.router.navigate(['/receptionist-appointments']);
          this.loadAppointments();
        },
        (error) => {
          this.ngxService.stop();
          if (error.status === 200) {
            this.notificationService.showSuccess(
              'Appointment assigned successfully!',
              'SUCCESS'
            );
            this.appointmentForm.reset();
            this.loadAppointments();

            return;
          }
          if (error.status === 400) {
            this.notificationService.showError(
              'Error while updating appointment',
              'ERROR'
            );

            return;
          }
        }
      );
  }
}
