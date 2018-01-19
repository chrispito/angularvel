import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable'

import { UserService } from '../../services/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-web-subs-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public btnTitle = 'Login \\ Register';
  private isUserLoggedIn = false;
  public loggedInuser = null;
  private user: Observable<User>;

  constructor(
    private router: Router, 
    private userService: UserService
  ) {
    console.log("MenuComponent: " + this.userService.isUserLoggedIn)
    if (userService.isUserLoggedIn) {
      this.isUserLoggedIn = true;
      this.loggedInuser = this.userService.getUser();
    }
  }

  ngOnInit() {
  }

  logout(event) {
    this.userService.logout();
  }

}
