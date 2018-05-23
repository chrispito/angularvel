import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from './api.service';

import { SearchData, BibleVersion, BibleBook, BibleLanguage, BibleChapter } from '../models';

@Injectable()
export class BibleSearchService {
  constructor(private router: Router, private api: ApiService) {}

  getLanguages() {
    return this.api.fetchGet('bible-search/languages', (fetchData) => {});
  }

  getVersions(language: BibleLanguage) {
    return this.api.fetchGet(`bible-search/versions/${language.short}`, (fetchData) => {});
  }

  getBooks(version: BibleVersion) {
    return this.api.fetchGet(`bible-search/books/${version.short}`, (fetchData) => {});
  }

  getChapters(book: BibleBook, version: BibleVersion) {
    return this.api.fetchGet(`bible-search/chapters/${book.name}/${version.short}`, (fetchData) => {});
  }

  getVerses(chapter: BibleChapter, book: BibleBook, version: BibleVersion) {
    return this.api.fetchGet(`bible-search/verses/${chapter.number}/${version.short}/${book.name}`, (fetchData) => {});
  }

  // search(searchData: SearchData) {
  //   var url = 'bible-search?'
  //   if (searchData.version) {
  //     url += `version=${searchData.version}`
  //   }
  //   if (searchData.book) {
  //     url += `&book=${searchData.book}`
  //   }
  //   if (searchData.chapter) {
  //     url += `&chapter=${searchData.chapter}`
  //   }
  //   if (searchData.verse) {
  //     url += `&verse=${searchData.verse}`
  //   }
  //   return this.api.fetchGet(
  //     url,
  //     (fetchData) => {});
  // }

}
