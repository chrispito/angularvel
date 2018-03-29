import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map'

import { BibleSearch } from '../../../models';
import * as fromStore from '../../../store';

export class State {
  constructor(public name: string, public short: string, public date: number) { }
}

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.css']
})
export class BibleComponent implements OnInit {

  bblSearchForm: FormGroup;
  versionsCtrl: FormControl;
  bblSearchState$: Observable<BibleSearch>;
  filteredVersions: Observable<any[]>;
  bblSearchData: BibleSearch;

  states: State[] = [
    {
      name: 'Elberfelder',
      date: 1871,
      short: 'elberfelder',
    },
    {
      name: 'Elberfelder',
      date: 1905,
      short: 'elberfelder1905',
    },
    {
      name: 'Luther',
      date: 1912,
      short: 'luther1912',
    },
    {
      name: 'Luther',
      date: 1545,
      short: 'luther1545',
    },
    {
      name: 'Schlachter',
      date: 1951,
      short: 'schlachter',
    },
    {
      name: 'Martin',
      date: 1744,
      short: 'martin',
    },
    {
      name: 'Louis Segond',
      date: 1910,
      short: 'ls1910',
    },
    {
      name: 'Ostervald (revision)',
      date: 1996,
      short: 'ostervald',
    }
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store<fromStore.WebPublicState>
  ) {
    this.bblSearchState$ = this.store.select<any>(fromStore.LoadBibleVersion);
    this.bblSearchState$.subscribe({
      next: bblSearch => {
        if (bblSearch) {
          this.bblSearchData = bblSearch
        }
      }
    });
    this.versionsCtrl = new FormControl();
    this.filteredVersions = this.versionsCtrl.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this.filterVersions(state) : this.states.slice())
    );
  }

  ngOnInit() {
    this.bblSearchForm = this.fb.group({
      bibleVersion: []
    });
  }

  filterVersions(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }


}
