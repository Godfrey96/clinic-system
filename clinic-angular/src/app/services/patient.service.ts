import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  apiURL = environment.apiUrl + '/patient';
  constructor(private http: HttpClient) {}

  public getSingleUser() {
    return this.http.get<User>(this.apiURL + '/get-patient');
  }
}
