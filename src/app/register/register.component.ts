import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: any;
  constructor(public auth: AuthService) {
    this.user = {
      displayName: "",
      login: "",
      password: ""
    }
  }
  ngOnInit() {
  }

  register() {
    this.auth.register(this.user);
  };
}
