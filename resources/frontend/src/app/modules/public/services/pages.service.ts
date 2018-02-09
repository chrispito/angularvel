import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './api.service';

import _ from 'lodash';

@Injectable()
export class PagesService {
  constructor(private router: Router, private api: ApiService) {}

  getAbout() {
    return this.api.fetchGet('about', fetchData => {});
  }

  updateAbout(pageData) {
    return this.api.fetchPost('updateAdbout', pageData, fetchData => {});
  }
}
