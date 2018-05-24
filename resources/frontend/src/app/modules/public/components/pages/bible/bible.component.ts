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
        this.selectedLanguage = bibleState.language
        this.selectionTabs[0].content = bibleState.languages
        this.selectedVersion = bibleState.version
        this.selectionTabs[1].content = bibleState.versions
        this.selectedBook = bibleState.book
        this.selectionTabs[2].content = bibleState.books
        this.selectedChapter = bibleState.chapter
        this.selectionTabs[3].content = bibleState.chapters
        this.verseStates = bibleState.verses
        if (this.verseStates && this.selectedBook && this.selectedChapter) {
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
    this.store.dispatch(new fromStore.SelectLanguage(language))
  }

  onSelectVersion(version: BibleVersion) {
    this.store.dispatch(new fromStore.SelectVersion(version))
  }

  onSelectBook(book: BibleBook) {
    this.store.dispatch(new fromStore.SelectBook(book, this.selectedVersion))
  }

  onSelectChapter(chapter: BibleChapter) {
    this.store.dispatch(new fromStore.SelectChapter(chapter, this.selectedBook, this.selectedVersion))
  }

  onSelectVerse(verse: BibleVerse) {
    this.store.dispatch(new fromStore.SelectVerse(verse))
  }

  search() {
  }
}
