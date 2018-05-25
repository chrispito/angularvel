import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromBibleSearchActions from '../actions/bible_search.action';
import * as fromBibleActions from '../actions/bible.action';
import * as fromServices from '../../services';
import { toPayload } from '@ngrx/effects/src/util';
import { SearchData, BibleSearchResult, BibleChapter, BibleVerse, BibleBook, BibleVersion, BibleLanguage } from '../../models'

@Injectable()
export class BibleSearchEffects {
  constructor(
    private action$: Actions,
    private bibleService: fromServices.BibleSearchService
  ) { }

  @Effect()
  getLanguages$ = this.action$.ofType(fromBibleSearchActions.GET_BIBLE_LANGUAGES).pipe(
    switchMap(() => this.bibleService
      .getLanguages()
      .pipe(
        map(response => {
          var languages: BibleLanguage[] = []
          response['data'].forEach(value => {
            languages.push({
              name: value['name'],
              short: value['short']
            })
          });
          return languages
        }),
        mergeMap(languages => {
          return [
            new fromBibleSearchActions.GetBibleLanguagesSuccess(languages),
            new fromBibleSearchActions.GetBibleVersions(languages[0]),
            new fromBibleActions.SelectLanguages(languages)
          ]
        }),
        catchError(error => of(new fromBibleSearchActions.GetBibleVersionsFail(error)))
      )
    )
  );

  @Effect()
  getBibleVersions$ = this.action$.ofType(fromBibleSearchActions.GET_BIBLE_VERSSIONS, fromBibleActions.SELECT_LANGUAGE).pipe(
    switchMap((payload) => {
      var selectedBookNumber = null
      var selectedChapterNumber = null
      if (payload.type == fromBibleActions.SELECT_LANGUAGE) {
        selectedBookNumber = payload['bookNumber']
        selectedChapterNumber = payload['chapterNumber']
      }
      return this.bibleService
      .getVersions(payload['language'])
      .pipe(
        map(response => {
          var versions: BibleVersion[] = []
          response['data'].forEach(value => {
            versions.push({
              name: value['name'],
              short: value['short']
            })
          });
          return versions
        }),
        mergeMap(versions => {
          return [
            new fromBibleSearchActions.GetBibleVersionsSuccess(versions),
            new fromBibleActions.SelectVersion(versions[0], selectedBookNumber, selectedChapterNumber),
            new fromBibleActions.SelectVersions(versions)
          ]
        }),
        catchError(error => of(new fromBibleSearchActions.GetBibleVersionsFail(error)))
      )
    })
  );

  @Effect()
  getBibleBooks$ = this.action$.ofType(fromBibleSearchActions.GET_BIBLE_BOOKS, fromBibleActions.SELECT_VERSION).pipe(
    switchMap(payload => {
      const version = payload['version']
      var selectedBookNumber = null
      var selectedChapterNumber = null
      if (payload.type == fromBibleActions.SELECT_VERSION) {
        selectedBookNumber = payload['bookNumber']
        selectedChapterNumber = payload['chapterNumber']
      }
      return this.bibleService.getBooks(version)
      .pipe(
        map(response => {
          var books: BibleBook[] = []
          response['data'].forEach(value => {
            books.push({
              name: value['name'],
              short: value['short'],
              number: value['number']
            })
          });
          return books
        }),
        mergeMap(books => {
          const bookIndex = selectedBookNumber ? selectedBookNumber - 1 : 0
          return [
            new fromBibleSearchActions.GetBibleBooksSuccess(books),
            new fromBibleActions.SelectBook(books[bookIndex], version, selectedChapterNumber),
            new fromBibleActions.SelectBooks(books)
          ]
        }),
        catchError(error => of(new fromBibleSearchActions.GetBibleBooksFail(error)))
      )}
    )
  );

  @Effect()
  getChapters$ = this.action$.ofType(fromBibleSearchActions.GET_BIBLE_CHAPTERS, fromBibleActions.SELECT_BOOK).pipe(
    switchMap(payload => {
      const version = payload['version']
      const book = payload['book']
      var selectedChapterNumber = null
      if (payload.type == fromBibleActions.SELECT_BOOK) {
        selectedChapterNumber = payload['chapterNumber']
      }
      return this.bibleService
      .getChapters(payload['book'], payload['version'])
      .pipe(
        map(response => {
          var chapters: BibleChapter[] = []
          response['data'].forEach(value => {
            chapters.push({
              book_number: value['book_number'],
              number: value['number']
            })
          });
          return chapters
        }),
        mergeMap(chapters => {
          const chapterIndex = selectedChapterNumber ? selectedChapterNumber - 1 : 0
          return [
            new fromBibleSearchActions.GetBibleChaptersSuccess(chapters),
            new fromBibleActions.SelectChapter(chapters[chapterIndex], book, version),
            new fromBibleActions.SelectChapters(chapters)
          ]
        }),
        catchError(error => of(new fromBibleSearchActions.GetBibleChaptersFail(error)))
      )}
    )
  );

  @Effect()
  getVerses$ = this.action$.ofType(fromBibleSearchActions.GET_BIBLE_VERSES, fromBibleActions.SELECT_CHAPTER).pipe(
    switchMap(payload => {
      return this.bibleService
      .getVerses(payload['chapter'], payload['book'], payload['version'])
      .pipe(
        map(response => {
          var verses: BibleVerse[] = []
          response['data'].forEach(value => {
            verses.push({
              verse: value['verse'],
              number: value['number'],
              book_number: value['book_number'],
              chapter_number: value['chapter_number'],
              key: value['key']
            })
          });
          return verses
        }),
        mergeMap(verses => {
          return [
            new fromBibleSearchActions.GetBibleVersesSuccess(verses),
            new fromBibleActions.SelectVerses(verses)
          ]
        }),
        catchError(error => of(new fromBibleSearchActions.GetBibleChaptersFail(error)))
      )
    }
    )
  );
}
