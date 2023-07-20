import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  apiUrl = environment.apiUrl + '/doctor';
  apiUrlAppointment = environment.apiUrl + '/doctor';

  constructor(private http: HttpClient) {}

  getCurrentDoctor() {
    return this.http.get<Doctor>(this.apiUrl + '/get-doctor');
  }

  updateDoctor(doctor: Doctor) {
    return this.http.put(this.apiUrl + '/update-doctor', doctor);
  }

  getAllPatientsAssignedToDoctor() {
    return this.http.get<Patient[]>(this.apiUrl + '/patients-by-doctor');
  }
}
