import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Appointments } from 'src/app/models/appointments';
import { Doctor } from 'src/app/models/doctor';
import { AuthService } from 'src/app/services/auth.service';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient';
import { UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css'],
})
export class ViewAppointmentsComponent implements OnInit {
  appointments: Appointments[] = [];
  appointmentForm!: FormGroup;
  isSubmitted: boolean = false;
  date!: Date;
  minDate!: Date;
  maxDate!: Date;
  visible: boolean = false;
  position: string = 'top';
  patientId: number | undefined;
  appointmentId!: number;
  statuses: string[] = ['Cancel'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    // console.log(this.loadAppointments);
    // this.loadAppointments();
    this.getCurrentPatient();
    this.fetchAppointmentsForPatient();
    this.appointmentStatusFormInit();
  }

  getCurrentPatient() {
    this.userService.getSingleUser().subscribe((patient: Patient) => {
      console.log('patient-: ', patient);
      this.patientId = patient.userId;
    });
  }

  fetchAppointmentsForPatient() {
    this.appointmentService.getAllAppointmentsForPatient().subscribe({
      next: (res: Appointments[]) => {
        console.log('appointments for patient: ', res);
        this.appointments = res;
      },
      error: (error) => {},
    });
  }

  // loadAppointments() {
  //   this.appointmentService.getAllAppointments().subscribe((res: any) => {
  //     this.appointments = res;
  //     console.log('res: ', res);
  //   });
  // }

  _addAppointmentFormInit() {
    this.appointmentForm = this.fb.group({
      problem: ['', Validators.required],
      date: [Date, Validators.required],
    });
  }

  appointmentStatusFormInit() {
    this.appointmentForm = this.fb.group({
      status: ['', Validators.required],
    });
  }

  showDialog(position: string) {
    this.position = position;
    this.visible = true;

    this.router.navigate(['/book-appointment']);
  }

  showDialogStatus(position: string, appointmentId: number) {
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
    console.log('cancel-status: ', status);

    this.appointmentService
      .cancelAppointmentStatusForUser(this.appointmentId, status)
      .subscribe(
        (res) => {
          this.ngxService.stop();
          this.notificationService.showSuccess(
            'Appointment Cancelled successfully!',
            'SUCCESS'
          );
          this.appointmentForm.reset();
          this.fetchAppointmentsForPatient();
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
            this.fetchAppointmentsForPatient();
            return;
          }
        }
      );
  }

  addAppointment() {}
}
