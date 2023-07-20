import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Appointments } from '../models/appointments';
import { Reception } from '../models/reception';
import { Patient } from '../models/patient';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiURL = environment.apiUrl + '/admin';
  constructor(private http: HttpClient) {}

  getAllDoctors() {
    return this.http.get<Doctor[]>(this.apiURL + '/viewDoctor');
  }

  getAllPatients() {
    return this.http.get<User[]>(this.apiURL + '/viewPatients');
  }

  getAllReceptionists() {
    return this.http.get<User[]>(this.apiURL + '/viewReceptionists');
  }

  getAllAppointments() {
    return this.http.get<Appointments[]>(this.apiURL + '/viewAppointments');
  }

  getAllAdmins() {
    return this.http.get<User[]>(this.apiURL + '/viewAdmins');
  }

  addNewDoctor(data: Doctor) {
    return this.http.post<Doctor>(this.apiURL + '/addNewDoctor', data);
  }

  addNewReceptionist(data: User) {
    return this.http.post<User>(this.apiURL + '/addNewReceptionist', data);
  }

  getUserById(userId: number) {
    return this.http.get(this.apiURL + '/get/' + userId);
  }

  updateDoctor(doctor: Doctor) {
    return this.http.put(this.apiURL + '/updateDoctor', doctor);
  }

  updateReception(reception: Reception) {
    return this.http.put(this.apiURL + '/update-reception', reception);
  }

  updatePatient(patient: Patient) {
    return this.http.put(this.apiURL + '/update-patient', patient);
  }

  deleteUser(userId: number) {
    return this.http.delete(this.apiURL + '/delete-doctor/' + userId);
  }

  deleteReception(userId: number) {
    return this.http.delete(this.apiURL + '/delete-reception/' + userId);
  }

  deletePatient(userId: number) {
    return this.http.delete(this.apiURL + '/delete-patient/' + userId);
  }
}
