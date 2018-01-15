import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiService } from './api.service';

import _ from 'lodash';

@Injectable()
export class UserService {

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
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
          .append('Accept', 'application/json')
          .append('Authorization', 'Bearer ' + jld_user_token);
        var options = { headers: headers }
        this.api.fetchGet('user', (fetchData) => {
          this.isUserLoggedIn = true;
          this.user = fetchData.data;
          console.log("UserService: " + this.isUserLoggedIn)
          console.log("UserService: ", this.user)
        }, options)
      }
    }
  }

  registerUser(userData) {
    this.api.fetchPost('register', userData, (data) => {
      console.log("Data = ", data)
    })
  }

  loginUser(userData) {
    this.api.fetchPost('authenticate', userData, (fetchData) => {
      localStorage.setItem('JLD-USER-TOKEN', JSON.stringify(fetchData));
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
    this.gotoHome()
  }

  gotoHome() {
    this.router.navigate(['home']);
  }

  getUser() {
    return this.user;
  }


}
