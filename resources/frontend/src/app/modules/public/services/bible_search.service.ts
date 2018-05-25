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
    return this.api.fetchGet(`bible-search/chapters/${book.number}/${version.short}`, (fetchData) => {});
  }

  getVerses(chapter: BibleChapter, book: BibleBook, version: BibleVersion) {
    return this.api.fetchGet(`bible-search/verses/${book.number}/${chapter.number}/${version.short}`, (fetchData) => {});
  }

}
