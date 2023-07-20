import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = environment.apiUrl + '/user';
  constructor(private http: HttpClient) {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles') || '{}');
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('token', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('token') || '';
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  //new
  public getSingleUser() {
    return this.http.get<User>(this.apiURL + '/get-user');
  }

  public updateProfile(code: string, data: User) {
    return this.http.put<User>(this.apiURL + '/update-user/' + code, data);
  }

  changePassword(data: any): Observable<string> {
    return this.http.post<string>(this.apiURL + "/change-password", data);
  }
}
