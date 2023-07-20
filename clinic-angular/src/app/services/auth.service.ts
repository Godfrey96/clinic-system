import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationResponse } from '../models/authentication-response';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from './user.service';
import { Doctor } from '../models/doctor';
import { AuthenticationRequest } from '../models/authentication-request';
import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = environment.apiUrl + '/auth';
  private currentUserSource: BehaviorSubject<AuthenticationResponse>;
  public currentUser$!: Observable<AuthenticationResponse>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.currentUserSource = new BehaviorSubject<AuthenticationResponse>({
      token: localStorage.getItem('token') || '',
      user: JSON.parse(localStorage.getItem('user') || '{}').user,
    });
    this.currentUser$ = this.currentUserSource.asObservable();
  }

  public get userValue(): AuthenticationResponse {
    return this.currentUserSource.value;
  }

  login(data: AuthenticationRequest) {
    return this.http.post<AuthenticationResponse>(this.apiURL + '/login', data);
  }

  register(data: Patient) {
    return this.http.post<Patient>(
      'http://localhost:8081/api/v1/patient' + '/register',
      data
    );
  }

  getUser() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logout();
    }
  }

  getUserRole() {
    let user = this.getUser();
    return user.roles;
  }

  logout() {
    localStorage.clear();
    // this.router.navigate(['/login/login']);
    this.router.navigate(['/home']);
  }

  public roleMatch(allowedRoles: any): any {
    let isMatch = false;
    const userRoles: any = this.userService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
