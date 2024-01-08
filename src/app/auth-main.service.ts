import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthMainService {
  jwthelp = new JwtHelperService();
  userCredentials: BehaviorSubject<any> = new BehaviorSubject(null);
  private Loginurl = 'http://localhost:3000/auth/login';
  private registerurl = 'http://localhost:3000/auth/register';
  private addUserUrl = 'http://localhost:3000/auth/addUser';
  constructor(private http: HttpClient, private route: Router) {}

  LoginUser(user: any) {
    return this.http.post(this.Loginurl, user, { withCredentials: true });
  }

  AddUser(user: any) {
    return this.http.post(this.addUserUrl, user, { withCredentials: true });
  }

  RegisterUser(user: any) {
    return this.http.post(this.registerurl, user);
  }

  LoggedIn() {
    return !!localStorage.getItem('token');
  }

  coordinator() {
    return !!localStorage.getItem('coordinator');
  }
  dugc() {
    return !!localStorage.getItem('dugc');
  }

  getUserType() {
    let data = localStorage.getItem('user_type');
    console.log(data);
    return data;
  }

  gettoken() {
    if (this.LoggedIn()) {
      return localStorage.getItem('token');
    } else if (this.dugc()) {
      return localStorage.getItem('dugc');
    } else {
      return localStorage.getItem('coordinator');
    }
  }
  logout() {
    localStorage.removeItem('dugc');
    localStorage.removeItem('coordinator');
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    this.route.navigate(['/']);
  }
}
