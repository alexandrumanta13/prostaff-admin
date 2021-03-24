import { Injectable, Inject } from '@angular/core';
import { User } from './user.model';

import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';

export interface AuthResponseData {
  user: User
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  private tokenExpirationTimer: any;
  constructor(private http: HttpClient, public router: Router) {
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
    this.user = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('ProstaffUserData')));
  }

  signup(user) {
    return this.http.post<AuthResponseData>(`https://pro-staff.ro/prostaff-api/v1/register`, { "firstName": user.name, "lastName": user.last_name, "email": user.email, "password": user.password })
      .pipe(tap(data => {
        if (data['success']) {
          this.handleAuthentication(
            data.user.id,
            data.user.name,
            data.user.last_name,
            data.user.email,
            data.user.date_last_visit,
            data.user.access,
            data.user.token
          );
        }

      })
      );
  }



  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://pro-staff.ro/prostaff-api/v1/login',
        {
          email: email,
          password: password,
        }
      )
      .pipe(
        tap(data => {
          console.log(data)
          this.handleAuthentication(
            data.user.id,
            data.user.name,
            data.user.last_name,
            data.user.email,
            data.user.date_last_visit,
            data.user.access,
            data.user.token,
          );

        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/autentificare']);
    localStorage.removeItem('ProstaffUserData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {

    this.tokenExpirationTimer = setTimeout(() => {
      console.log(expirationDuration)
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const ProstaffUserData: {
      id: number,
      name: string,
      last_name: string,
      email: string,
      date_last_visit: Date,
      access: number,
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('ProstaffUserData'));
    if (!ProstaffUserData) {
      return;
    }

    const loadedUser = new User(
      ProstaffUserData.id,
      ProstaffUserData.name,
      ProstaffUserData.last_name,
      ProstaffUserData.email,
      ProstaffUserData.date_last_visit,
      ProstaffUserData.access,
      ProstaffUserData._token,
      new Date(ProstaffUserData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(ProstaffUserData._tokenExpirationDate).getTime() -
        new Date().getTime();
      //this.autoLogout(expirationDuration);

    }
  }

  private handleAuthentication(
    id: number,
    name: string,
    last_name: string,
    email: string,
    date_last_visit: Date,
    access: number,
    token: string,

  ) {

    const expirationDate = new Date(date_last_visit);
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    const user = new User(
      id,
      name,
      last_name,
      email,
      date_last_visit,
      access,
      token,
      expirationDate
    )
    this.user.next(user);
    //this.autoLogout(expirationDate.getTime());

    localStorage.setItem('ProstaffUserData', JSON.stringify(user))
  }

  recover(email) {
    return new Promise((resolve, reject) => {

      this.http.post('https://pro-staff.ro/prostaff-api/v1/recover', {'email': email} )
        .subscribe((response: any) => {
          resolve(response);
        }, reject);

    });
  }

  changePassword(password, token) {
    return new Promise((resolve, reject) => {

      this.http.post('https://pro-staff.ro/prostaff-api/v1/changePassword', {'token': token, 'password': password} )
        .subscribe((response: any) => {
          resolve(response);
        }, reject);

    });
  }
}
