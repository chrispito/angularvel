import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import {startWith} from 'rxjs/operators/startWith'
import {map} from 'rxjs/operators/map'

import { BibleSearchResult, BibleVersion, BibleBook, BibleChapter, BibleVerse, SearchData } from '../../../models'
import * as fromStore from '../../../store'
import * as fromActions from '../../../store/actions'
import { Actions } from '@ngrx/effects';

export interface SelectionTab {
  content: BibleVersion[];
  label: string;
}

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss']
})
export class BibleComponent implements OnInit {

  bblSearchForm: FormGroup
  // bblSearchState$: Observable<BibleSearchResult>

  versionStates: BibleVersion[]
  bookStates: BibleBook[]
  chapterStates: BibleChapter[]
  verseStates: BibleVerse[]
  searchData: SearchData = new SearchData()

  result: string

  selection: string = ""
  toggleSelectionTabs: boolean

  selectedVersion: BibleVersion
  selectedBook: BibleBook
  selectedChapter: BibleChapter
  selectedVerse: BibleVerse

  selectionTabs: SelectionTab[] = [
    {
      label: 'Version',
      content: null
    },
    {
      label: 'Book',
      content: null
    },
    {
      label: 'Chapter',
      content: null
    },
  ]

  constructor(
    private fb: FormBuilder,
    private store: Store<fromStore.WebPublicState>,
    actions$: Actions
  ) {
    this.store.dispatch(new fromStore.GetBibleVersions())

    this.store.select<any>(fromStore.getBibleSelectionState)
    .subscribe({
      next: bibleState => {
        this.selectedVersion = bibleState.version
        this.selectionTabs[0].content = bibleState.versions
        this.selectedBook = bibleState.book
        this.selectionTabs[1].content = bibleState.books
        this.selectedChapter = bibleState.chapter
        this.selectionTabs[2].content = bibleState.chapters
        if (this.selectedBook && this.selectedChapter) {
          this.displayResult()
        }
      }
    })
  }

  ngOnInit() {
    this.toggleSelectionTabs = false
  }

  displayResult() {
    this.selection = this.selectedBook.name + ' ' + this.selectedChapter.number
    this.result = this.selectedChapter.verses.map(verse => '(' + verse.verse_nr + ') ' + verse.verse).join(' ')
  }

  onSelectVersion(version: BibleVersion) {
    this.store.dispatch(new fromStore.SelectVersion(version))
  }

  onSelectBook(book: BibleBook) {
    this.store.dispatch(new fromStore.SelectBook(book, this.selectedVersion))
  }

  onSelectChapter(chapter: BibleChapter) {
    this.store.dispatch(new fromStore.SelectChapter(chapter))
  }

  search() {
  }
}
