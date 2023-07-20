import { Injectable } from '@angular/core';
import { Appointments } from '../models/appointments';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CreateAppointmentRequest } from '../models/create-appointment-request';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  apiURL = environment.apiUrl + '/appointment';

  constructor(private http: HttpClient) {}

  createAppointment(data: CreateAppointmentRequest) {
    return this.http.post(this.apiURL + '/create-appointment', data);
  }

  getAllAppointmentsByPatientId(id: any) {
    return this.http.get(this.apiURL + '/appointments-for-patient/', id);
  }

  getAllAppointmentsForDoctor(): Observable<Appointments[]> {
    return this.http.get<Appointments[]>(
      this.apiURL + '/appointments-for-doctor'
    );
  }

  getAllAppointmentsForPatient() {
    return this.http.get<Appointments[]>(
      this.apiURL + '/appointments-for-patient'
    );
  }

  getAllAppointmentsByDoctorId(id: any) {
    return this.http.get(this.apiURL + '/appointments-for-patient/', id);
  }

  updateAppointmentById(id: string, data: any) {
    return this.http.put(this.apiURL + '/update-appointment/', id, data);
  }

  getAllAppointments(): Observable<Appointments[]> {
    return this.http.get<Appointments[]>(this.apiURL + '/get-all-appointments');
  }

  getAppointmentsForDoctor(id: any) {
    return this.http.get(this.apiURL + '/appointments-for-doctor/' + id);
  }

  getAppointmentById(appointmentId: number) {
    return this.http.get(this.apiURL + '/get-appointment/' + appointmentId);
  }

  assignAppointmentSlotToDoctor(
    appointmentId: number,
    slotId: number,
    doctorId: number,
    status: string
  ) {
    const url = `${this.apiURL}/assign-appointments/${appointmentId}/slots/${slotId}/doctors/${doctorId}`;
    return this.http.put(url, null);
  }

  assignAppointmentStatusToDoctor(appointmentId: number, status: string) {
    const url = `${this.apiURL}/update-appointment-status/${appointmentId}/status`;
    return this.http.put(url, null);
  }

  cancelAppointmentStatusForUser(appointmentId: number, status: string) {
    const url = `${this.apiURL}/cancel-appointment/${appointmentId}/cancel`;
    return this.http.put(url, null);
  }
}
