import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { er } from '@fullcalendar/core/internal-common';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SelectItem } from 'primeng/api';
import { Appointments } from 'src/app/models/appointments';
import { CreateAppointmentRequest } from 'src/app/models/create-appointment-request';
import { Patient } from 'src/app/models/patient';
import { AppointmentService } from 'src/app/services/appointment.service';
import { NotificationService } from 'src/app/services/notification.service';
import { PatientService } from 'src/app/services/patient.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css'],
})
export class BookAppointmentComponent implements OnInit {
  bookAppointmentForm!: FormGroup;
  isSubmitted: boolean = false;
  responseMessage: any;
  minDate!: Date;
  maxDate!: Date;
  // disabledDates!: SelectItem[];
  patientId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getCurrentPatient();
    this.bookAppointmentInit();
  }

  getCurrentPatient() {
    this.userService.getSingleUser().subscribe((patient: Patient) => {
      console.log('patient-: ', patient);
      this.patientId = patient.userId;
    });
  }

  bookAppointmentInit() {
    this.bookAppointmentForm = this.fb.group({
      // selectedDate: [null],
      date: [Date, Validators.required],
      details: ['', Validators.required],
    });
  }

  // isDisabledDate = (date: Date): boolean => {
  //   const today = new Date();
  //   return date < today;
  // };

  // proceedAddDoctor() {
  //   this.ngxService.start();
  //   this.isSubmitted = true;
  //   const doctor: RegisterRequestDto = {
  //     firstName: this.addDoctorFormError['firstName'].value,
  //     lastName: this.addDoctorFormError['lastName'].value,
  //     email: this.addDoctorFormError['email'].value,
  //     password: this.addDoctorFormError['password'].value,
  //   };
  //   this.authService.addNewDoctor(doctor).subscribe(
  //     (response: any) => {
  //       this.ngxService.stop();
  //       this.responseMessage = response?.message;
  //       this.notificationService.showSuccess(
  //         'Doctor added successfully',
  //         'SUCCESS'
  //       );
  //       this.addDoctorForm.value.clear;
  //       this.router.navigate(['/admin-doctor']);
  //     },
  //     (error: any) => {
  //       this.ngxService.stop();
  //       console.log('error: ', error);
  //     }
  //   );
  // }

  bookApp() {
    this.ngxService.start();
    this.isSubmitted = true;

    const appointment: CreateAppointmentRequest = {
      appointmentBookingDate: this.bookAppointmentFormError['date'].value,
      problem: this.bookAppointmentFormError['details'].value,
      patientId: this.patientId,
    };

    console.log('rbooing: ', appointment);

    this.appointmentService.createAppointment(appointment).subscribe({
      next: (response) => {
        this.ngxService.stop();
        this.notificationService.showSuccess(
          'Your appointment was booked successfully',
          'SUCCESS'
        );
        this.bookAppointmentForm.reset();
        this.router.navigate(['/view-appointments']);
      },
      error: (error) => {
        this.ngxService.stop();
        if (error?.status === 400) {
          console.log('error: ', error);
          console.log('error-status: ', error.status);
          this.notificationService.showError(
            'Failed to book an appointment',
            'ERROR'
          );
        } else if (error?.status === 200) {
          this.ngxService.stop();
          console.log('error: ', error);
          console.log('error-status: ', error.status);
          this.notificationService.showSuccess(
            'Your appointment was booked successfully',
            'SUCCESS'
          );
          this.bookAppointmentForm.reset();
          this.router.navigate(['/view-appointments']);
        } else {
          console.log('error******: ', error);
          console.log('error-status*******: ', error.status);
          console.log('An error occurred. Error object is undefined.');
          this.notificationService.showError(
            'An error occurred while processing your request',
            'ERROR'
          );
        }
        // console.log('error: ', error);
        // console.log('error-status: ', error.status);
        // this.notificationService.showError(
        //   'Failed to book an appointment',
        //   'ERROR'
        // );
      },
      complete: () => {},
    });

    // this.appointmentService.createAppointment(appointment).subscribe(
    //   (response: any) => {
    //     this.ngxService.stop();
    //     this.responseMessage = response?.message;
    //     this.notificationService.showSuccess(
    //       'Your appointment was booked successfully',
    //       'SUCCESS'
    //     );
    //     this.bookAppointmentForm.reset();
    //     this.router.navigate(['/view-appointments']);
    //   },
    //   (error: any) => {
    //     this.ngxService.stop();
    //     console.log('error: ', error);
    //     console.log('error-status: ', error.status);
    //   }
    // );

    // this.appointmentService.createAppointment(appointment).subscribe(
    //   (res: any) => {
    //     this.ngxService.stop();
    //     this.responseMessage = res?.message;
    //     this.notificationService.showSuccess(
    //       'Appointment succesfully booked!',
    //       'SUCCESS'
    //     );
    //     this.router.navigate(['/view-appointments']);
    //   },
    //   (error) => {
    //     this.ngxService.stop();
    //     console.log('error: ', error);
    //     if (error.status === 200) {
    //       this.notificationService.showSuccess(
    //         'Appointment succesfully booked!',
    //         'SUCCESS'
    //       );
    //       this.router.navigate(['/view-appointments']);
    //       return;
    //     }
    //   }
    // );
  }

  // errors
  get bookAppointmentFormError() {
    return this.bookAppointmentForm.controls;
  }
}
