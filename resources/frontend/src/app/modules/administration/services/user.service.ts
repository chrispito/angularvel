import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './api.service';

import _ from 'lodash';

@Injectable()
export class UserService {

  constructor(private router: Router, private api: ApiService) {}

  getUser() {
    return this.api.fetchGet('user', fetchData => {});
  }

  loginUser(userData) {
    return this.api.fetchPost('authenticate', userData, data => {});
  }

}
