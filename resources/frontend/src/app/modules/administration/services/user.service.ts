import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ApiService } from './api.service';

// import { User } from './../models/User';

import _ from 'lodash';

@Injectable()
export class UserService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  public isUserLoggedIn;
  private userToken;
  private user;

  constructor(
    private router: Router,
    private api: ApiService,
    private http: HttpClient
  ) {
    if (_.isEmpty(this.user)) {
      const jld_user_token = JSON.parse(localStorage.getItem('JLD-USER-TOKEN'));
      if (jld_user_token) {
        this.api.fetchGet('user', (fetchData) => {
          this.loggedIn.next(true);
          this.user = fetchData.data;
        })
      }
    }
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  registerUser(userData) {
    this.api.fetchPost('register', userData, (data) => {
    })
  }

  loginUser(userData) {
    this.api.fetchPost('authenticate', userData, (fetchData) => {
      localStorage.setItem('JLD-USER-TOKEN', JSON.stringify(fetchData));
      this.loggedIn.next(true);
      window.location.reload(true);
    })
  }

  getUserToken() {
    return this.userToken;
  }

  setUserLoggedIn(userData) {
    localStorage.setItem('JLD-USER-TOKEN', JSON.stringify(userData));
    this.gotoHome()
  }

  logout() {
    localStorage.removeItem('userData');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  gotoHome() {
    this.router.navigate(['home']);
  }

  getUser() {
    return this.api.fetchGet('user', (fetchData) => { });
  }


}
