import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map'

import { BibleSearch, BibleVersion, BibleBook } from '../../../models';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss']
})
export class BibleComponent implements OnInit {

  bblSearchForm: FormGroup;
  bblSearchState$: Observable<BibleSearch>;
  filteredVersions: Observable<any[]>;
  filteredBooks: Observable<any[]>;
  filteredChapters: Observable<any[]>;
  bblSearchData: BibleSearch;

  versionStates: BibleVersion[];
  bookStates: BibleBook[];
  chapterStates: string[];

  selectedVersion: BibleVersion;
  selectedBook: BibleBook;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromStore.WebPublicState>
  ) {
    this.store.dispatch(new fromStore.GetBibleVersions());
    this.bblSearchState$ = this.store.select<any>(fromStore.getBibleSearchData);
    this.bblSearchState$.subscribe({
      next: bblSearch => {
        if (bblSearch && this.bblSearchForm) {
          if (bblSearch.versions) {
            this.versionStates = bblSearch.versions;
            this.filteredVersions = this.bblSearchForm.get('bibleVersion').valueChanges
            .pipe(
              startWith(''),
              map(state => state ? this.filterVersions(state) : this.versionStates.slice())
            );
          }
          if (bblSearch.books) {
            this.bookStates = bblSearch.books;
            this.filteredBooks = this.bblSearchForm.get('bibleBook').valueChanges
            .pipe(
              startWith(''),
              map(state => state ? this.filterBooks(state) : this.bookStates.slice())
            );
          }
        }
      }
    });
    
  }

  ngOnInit() {
    this.bblSearchForm = this.fb.group({
      bibleVersion: new FormControl(),
      bibleBook: new FormControl(),
      chapter: ['', Validators.required],
      verse: ['', Validators.required]
    });
  }

  filterVersions(name: string) {
    return this.versionStates.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  filterBooks(name: string) {
    return this.bookStates.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  onVersionSelect(version) {
    this.selectedVersion = version
    this.store.dispatch(new fromStore.GetBibleBooks(version.short))
  }

  onBookSelect(book) {
    this.selectedBook = book
    this.store.dispatch(new fromStore.GetBibleChapters({
      version: this.selectedVersion.short, 
      book: this.selectedBook.name
    }))
  }

  search() {
  }
}
