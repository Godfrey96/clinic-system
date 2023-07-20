import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Appointments } from 'src/app/models/appointments';
import { Patient } from 'src/app/models/patient';
import { AppointmentService } from 'src/app/services/appointment.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
})
export class PatientDashboardComponent implements OnInit {
  appointments: Appointments[] = [];
  date!: Date;
  minDate!: Date;
  maxDate!: Date;
  visible: boolean = false;
  position: string = 'top';
  patientId: number | undefined;

  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.fetchAppointmentsForPatient();
  }

  getCurrentPatient() {
    this.patientService.getSingleUser().subscribe((patient: Patient) => {
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
}
