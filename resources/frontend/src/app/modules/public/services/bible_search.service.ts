import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './api.service';

import _ from 'lodash';

@Injectable()
export class BibleSearchService {
  constructor(private router: Router, private api: ApiService) {}

  getBibleVersions() {
    return this.api.fetchGet('bible-search/versions', fetchData => {});
  }

  getBibleBooks(version) {
    return this.api.fetchGet(`bible-search/books/${version}`, fetchData => {});
  }

  // search() {
  //   return this.api.fetchGet('bible-search', fetchData => {});
  // }

}
