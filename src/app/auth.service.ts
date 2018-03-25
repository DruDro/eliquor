// declare var require: any;
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './User';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const port = 3000;


@Injectable()
export class AuthService {
  usersURL = `${document.domain}:${port}/users`;
  public isAuthenticated = localStorage.getItem("isAuthenticated") == 'true';
  public user = this.isAuthenticated ? JSON.parse(localStorage.getItem("user")) : {};
  constructor(private router: Router, private http: HttpClient) {

  }
  getUser(login: string, password: string): Observable<User> {
    return this.http.get<User>(`${this.usersURL}?login=${login}&password=${password}`);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersURL}`);
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
  register(user: User): void {
    const checkUser:any = () => this.http.get<User>(`${this.usersURL}?login=${user.login}`);
    const register:any = () => this.http.post(`${this.usersURL}`, user).subscribe(userAdded => {      
      this.login(user.login, user.password);
    });
    checkUser().subscribe(userExists => userExists.length ? console.log(userExists) : register() )
  }
  update(user: User): void {
    this.http.put(`${this.usersURL}/${user.id}`, user).subscribe(userAdded => {      
      this.login(user.login, user.password);
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
