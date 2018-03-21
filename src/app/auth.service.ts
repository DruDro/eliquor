import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './User';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  usersURL = 'http://localhost:3001/users';
  public isAuthenticated = localStorage.getItem("isAuthenticated") == 'true';
  public user = this.isAuthenticated ? JSON.parse(localStorage.getItem("user")) : {};
  constructor(private router: Router, private http: HttpClient) {

  }
  getUser(login: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.usersURL}?login=${login}&password=${password}`);
  }
  login(login: string, password: string): void {
    this.getUser(login, password)
      .subscribe((userResponse:any)  => {
          if (userResponse.length) {
            this.isAuthenticated = true;
            localStorage.setItem("isAuthenticated", 'true');
            localStorage.setItem("user", JSON.stringify(userResponse));
            this.user = userResponse;
            this.router.navigate(['/']);
          } else {
            this.isAuthenticated = false; 
            this.user = {};
            localStorage.setItem("isAuthenticated", 'false');
            localStorage.setItem("user", '');
          }
      });
  }
  logout(): void {
    this.isAuthenticated = false; 
    this.user = {};
    localStorage.setItem("isAuthenticated", 'false');
    localStorage.setItem("user", '');
    this.router.navigate(['/login']);
  }
}
