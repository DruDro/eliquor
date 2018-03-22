import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../User';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: User = this.auth.user[0];
  constructor(public auth: AuthService) {
  }
  ngOnInit() {
  }

  save() {
    this.auth.update(this.user);
  };

}
