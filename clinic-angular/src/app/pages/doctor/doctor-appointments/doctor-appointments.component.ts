import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Appointments } from 'src/app/models/appointments';
import { Doctor } from 'src/app/models/doctor';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.css'],
})
export class DoctorAppointmentsComponent implements OnInit {
  appointmentForm!: FormGroup;
  appointments!: Appointments[];
  doctor!: Doctor;
  statuses: string[] = ['Done'];
  appointmentId!: number;
  isSubmitted: boolean = false;

  visible: boolean = false;

  position: string = 'top';

  constructor(
    private appointmentService: AppointmentService,
    private doctorService: DoctorService,
    private fb: FormBuilder,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // this.getCurrentDoctor();
    this.getAppointmentsForDoctor();
    this.appointmentStatusFormInit();
  }

  getAppointmentsForDoctor() {
    this.appointmentService
      .getAllAppointmentsForDoctor()
      .subscribe((appointment: Appointments[]) => {
        console.log('appointments: ', appointment);
        this.appointments = appointment;
      });
  }

  appointmentStatusFormInit() {
    this.appointmentForm = this.fb.group({
      status: ['', Validators.required],
    });
  }

  showDialog(position: string, appointmentId: number) {
    this.position = position;
    this.visible = true;

    this.appointmentId = appointmentId;

    console.log('appointmentId: ', appointmentId);
  }

  updateAppointmentStatus() {
    this.ngxService.start();
    this.isSubmitted = true;
    this.visible = false;

    const status = this.appointmentForm.value?.status;

    this.appointmentService
      .assignAppointmentStatusToDoctor(this.appointmentId, status)
      .subscribe(
        (res) => {
          this.ngxService.stop();
          this.notificationService.showSuccess(
            'Appointment assigned successfully!',
            'SUCCESS'
          );
          this.appointmentForm.reset();
          this.getAppointmentsForDoctor();
        },
        (error) => {
          this.ngxService.stop();
          if (error.status === 400) {
            this.notificationService.showError(
              'Error while updating appointment',
              'ERROR'
            );
            return;
          } else {
            this.notificationService.showSuccess(
              'Appointment status updated successfully!',
              'SUCCESS'
            );
            this.appointmentForm.reset();
            this.getAppointmentsForDoctor();
            return;
          }
        }
      );
  }

  // getCurrentDoctor() {
  //   this.doctorService.getCurrentDoctor().subscribe((doctor: Doctor) => {
  //     this.doctor = doctor.userId;
  //     // this.getAppointmentsForDoctor();
  //   });
  // }

  // getAppointmentsForDoctor() {
  //   this.appointmentService
  //     .getAppointmentsForDoctor(this.doctor)
  //     .subscribe((res: any) => {
  //       console.log('res-res: ', res);
  //       this.appointments = res;
  //       console.log('this.appointments: ', this.appointments);
  //     });
  // }
}
