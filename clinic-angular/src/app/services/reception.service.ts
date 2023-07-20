import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class ReceptionService {

  apiURL = environment.apiUrl + '/receptionist';

  constructor(private http: HttpClient) { }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiURL + '/get-all-doctors')
  }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiURL + '/get-all-patients')
  }
}
