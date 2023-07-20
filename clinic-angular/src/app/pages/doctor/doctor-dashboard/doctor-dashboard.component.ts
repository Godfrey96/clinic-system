import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Appointments } from 'src/app/models/appointments';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';
import { AppointmentService } from 'src/app/services/appointment.service';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.css'],
})
export class DoctorDashboardComponent implements OnInit {
  appointments!: Appointments[];
  patients!: Patient[];

  constructor(
    private modalService: BsModalService,
    private appointmentService: AppointmentService,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this.getAppointmentsForDoctor();
    this.fetchPatientsAssignedToDoctor();
  }

  getAppointmentsForDoctor() {
    this.appointmentService
      .getAllAppointmentsForDoctor()
      .subscribe((appointment: Appointments[]) => {
        console.log('appointments: ', appointment);
        this.appointments = appointment;
      });
  }

  fetchPatientsAssignedToDoctor() {
    this.doctorService
      .getAllPatientsAssignedToDoctor()
      .subscribe((res: Patient[]) => {
        this.patients = res;
      });
  }
}
