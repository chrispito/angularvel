import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map'

import { BibleSearch, BibleSearchVersion } from '../../../models';
import * as fromStore from '../../../store';

// export class State {
//   constructor(public name: string) { }
// }

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss']
})
export class BibleComponent implements OnInit {

  bblSearchForm: FormGroup;
  bblSearchState$: Observable<BibleSearch>;
  filteredVersions: Observable<any[]>;
  bblSearchData: BibleSearch;

  states: BibleSearchVersion[];

  constructor(
    private fb: FormBuilder,
    private store: Store<fromStore.WebPublicState>
  ) {
    this.store.dispatch(new fromStore.GetBibleVersions());
    this.bblSearchState$ = this.store.select<any>(fromStore.getBibleSearchData);
    this.bblSearchState$.subscribe({
      next: bblSearch => {
        if (bblSearch && bblSearch.versions) {
          this.states = bblSearch.versions;
          this.filteredVersions = this.bblSearchForm.get('bibleVersion').valueChanges
          .pipe(
            startWith(''),
            map(state => state ? this.filterVersions(state) : this.states.slice())
          );
        }
      }
    });
    
  }

  ngOnInit() {
    this.bblSearchForm = this.fb.group({
      bibleVersion: new FormControl(),
      book: ['', Validators.required],
      chapter: ['', Validators.required],
      verse: ['', Validators.required]
    });

    // this.filteredVersions = this.bblSearchForm.get('bibleVersion').valueChanges
    // .pipe(
    //   startWith(''),
    //   map(state => state ? this.filterVersions(state) : this.states.slice())
    // );
  }

  filterVersions(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  search() {
    const version = this.states.filter(state =>
      state.name.toLowerCase().indexOf(this.bblSearchForm.value.bibleVersion.toLowerCase()) === 0)
    console.log("this.bblSearchForm.value = ", version)
    if (this.bblSearchForm.valid) {
      this.store.dispatch(
        new fromStore.SearchBible({
          ...this.bblSearchForm.value
        })
      );
    }
  }
}
