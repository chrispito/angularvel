import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import {startWith} from 'rxjs/operators/startWith'
import {map} from 'rxjs/operators/map'
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';

import { BibleSearchResult, BibleVersion, BibleBook, BibleChapter, BibleVerse, SearchData, BibleLanguage } from '../../../models'
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

  searchData: SearchData = new SearchData()

  result: string

  selection: string = ""
  toggleSelectionTabs: boolean
  toggleTreeTabs: boolean

  selectedLanguage: BibleLanguage
  selectedVersion: BibleVersion
  selectedBook: BibleBook
  selectedChapter: BibleChapter
  selectedVerse: BibleVerse

  verseStates: BibleVerse[]

  selectionTabs: SelectionTab[] = [
    {
      label: 'Language',
      content: null
    },
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
  nodes = []

  options: ITreeOptions = {
    displayField: 'name',
    isExpandedField: 'expanded',
    idField: 'uuid',
    hasChildrenField: 'nodes',
    actionMapping: {
      mouse: {
        dblClick: (tree, node, $event) => {
          if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        }
      },
      keys: {
        [KEYS.ENTER]: (tree, node, $event) => {
          node.expandAll();
        }
      }
    },
    nodeHeight: 32,
    allowDrag: (node) => {
      return true;
    },
    allowDrop: (node) => {
      return true;
    },
    useVirtualScroll: true,
    animateExpand: true,
    scrollOnActivate: true,
    animateSpeed: 30,
    animateAcceleration: 1.2,
    scrollContainer: document.body.parentElement
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<fromStore.WebPublicState>,
    actions$: Actions
  ) {
    this.store.dispatch(new fromStore.GetBibleLanguages())

    this.store.select<any>(fromStore.getBibleSelectionState)
    .subscribe({
      next: bibleState => {
        this.selectionTabs[0].content = bibleState.languages
        this.selectedLanguage = bibleState.languages.filter(lang => bibleState.language == lang.short)[0]
        this.selectionTabs[1].content = bibleState.versions
        this.selectedVersion = bibleState.versions.filter(version => bibleState.version == version.short)[0]
        this.selectionTabs[2].content = bibleState.books
        this.selectedBook = bibleState.books.filter(book => bibleState.book == book.number)[0]
        this.selectionTabs[3].content = bibleState.chapters
        this.selectedChapter = bibleState.chapters.filter(chapter => bibleState.chapter == chapter.number)[0]
        this.verseStates = bibleState.verses
        if (this.selectedLanguage && this.selectedBook && this.selectedChapter && this.verseStates) {
          this.displayResult()
        }
      }
    })
  }

  ngOnInit() {
    this.toggleSelectionTabs = false
    this.toggleTreeTabs = false
    this.nodes =  [
      {
        id: 1,
        name: 'root1',
        children: [
          { id: 2, name: 'child1' },
          { id: 3, name: 'child2' }
        ]
      },
      {
        id: 4,
        name: 'root2',
        children: [
          { id: 5, name: 'child2.1' },
          {
            id: 6,
            name: 'child2.2',
            children: [
              { id: 7, name: 'subsub' }
            ]
          }
        ]
      }
    ]
  }

  displayResult() {
    this.selection = '[' + this.selectedLanguage.short.toUpperCase() + '] ' + this.selectedBook.name + ' ' + this.selectedChapter.number
    this.result = this.verseStates.map(verse => '(' + verse.number + ') ' + verse.verse).join(' ')
  }

  onSelectLanguage(language: BibleLanguage) {
    this.store.dispatch(new fromStore.SelectLanguage(language, this.selectedBook.number, this.selectedChapter.number))
  }

  onSelectVersion(version: BibleVersion) {
    this.store.dispatch(new fromStore.SelectVersion(version, this.selectedBook.number, this.selectedChapter.number))
  }

  onSelectBook(book: BibleBook) {
    this.store.dispatch(new fromStore.SelectBook(book, this.selectedVersion, this.selectedChapter.number))
  }

  onSelectChapter(chapter: BibleChapter) {
    this.store.dispatch(new fromStore.SelectChapter(chapter, this.selectedBook, this.selectedVersion))
  }

  onSelectVerse(verse: BibleVerse) {
    // this.store.dispatch(new fromStore.SelectVerse(verse))
  }

  search() {
  }
}
