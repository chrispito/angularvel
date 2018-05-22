import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './api.service';

import { SearchData, BibleVersion, BibleBook } from '../models';

@Injectable()
export class BibleSearchService {
  constructor(private router: Router, private api: ApiService) {}

  getBibleVersions() {
    return this.api.fetchGet('bible-search/versions', (fetchData) => {
      console.log("###################################  getBibleVersions   ##########################")
      console.log("###################################  getBibleVersions   ##########################")
      console.log("###################################  getBibleVersions   ##########################")
    });
  }

  getBibleBooks(version: BibleVersion) {
    return this.api.fetchGet(`bible-search/books/${version.short}`, (fetchData) => {});
  }

  getBibleChapters(book: BibleBook, version: BibleVersion) {
    return this.api.fetchGet(`bible-search/verses/${version.short}/${book.name}`, (fetchData) => {});
  }

  search(searchData: SearchData) {
    var url = 'bible-search?'
    if (searchData.version) {
      url += `version=${searchData.version}`
    }
    if (searchData.book) {
      url += `&book=${searchData.book}`
    }
    if (searchData.chapter) {
      url += `&chapter=${searchData.chapter}`
    }
    if (searchData.verse) {
      url += `&verse=${searchData.verse}`
    }
    return this.api.fetchGet(
      url,
      (fetchData) => {});
  }

}
