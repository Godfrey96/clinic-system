import { Component, OnInit } from '@angular/core';
import { Doctor } from 'src/app/models/doctor';
import { Patient } from 'src/app/models/patient';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-patients',
  templateUrl: './doctor-patients.component.html',
  styleUrls: ['./doctor-patients.component.css'],
})
export class DoctorPatientsComponent implements OnInit {
  patients!: Patient[];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.fetchPatientsAssignedToDoctor();
  }

  fetchPatientsAssignedToDoctor() {
    this.doctorService
      .getAllPatientsAssignedToDoctor()
      .subscribe((res: Patient[]) => {
        this.patients = res;
      });
  }
}
