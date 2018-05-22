import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromBibleSearchActions from '../actions/bible_search.action';
import * as fromBibleActions from '../actions/bible.action';
import * as fromServices from '../../services';
import { toPayload } from '@ngrx/effects/src/util';
import { SearchData, BibleSearchResult, BibleChapter, BibleVerse, BibleBook, BibleVersion } from '../../models'

@Injectable()
export class BibleSearchEffects {
  constructor(
    private action$: Actions,
    private bibleService: fromServices.BibleSearchService
  ) { }

  @Effect()
  loadBibles$ = this.action$.ofType(fromBibleSearchActions.SEARCH_BIBLE).pipe(
    switchMap(payload => this.bibleService
      .search(payload['searchData'])
      .pipe(
        map(response => {
          var search: BibleSearchResult = new BibleSearchResult
          var chapter = new BibleChapter
          chapter.number = response.result[0].chapter_nr
          var verses: BibleVerse[] = []

          var chapters: BibleChapter[] = []

          response.result.forEach(value => {
            var verse = new BibleVerse
            verse.bbl_book_id = value['bbl_book_id']
            verse.chapter_nr = value['chapter_nr']
            verse.verse_nr = value['verse_nr']
            verse.verse = value['verse']
            verses.push(verse)
          })

          chapter.verses = verses
          chapters.push(chapter)
          search.chapters = chapters
          search.requestData = response.searchDtata
          return new fromBibleSearchActions.SearchBibleSuccess(search)
        }),
        catchError(error => of(new fromBibleSearchActions.SearchBibleFail(error)))
      )
    )
  );

  @Effect()
  getBibleVersions$ = this.action$.ofType(fromBibleSearchActions.GET_BIBLE_VERSSIONS).pipe(
    switchMap(() => this.bibleService
      .getBibleVersions()
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
            new fromBibleActions.SelectVersions(versions),
            new fromBibleActions.SelectVersion(versions[0])
          ]
        }),
        catchError(error => of(new fromBibleSearchActions.GetBibleVersionsFail(error)))
      )
    )
  );

  @Effect()
  getBibleBooks$ = this.action$.ofType(fromBibleSearchActions.GET_BIBLE_BOOKS, fromBibleActions.SELECT_VERSION).pipe(
    switchMap(payload => {
      const version = payload['version']
      return this.bibleService.getBibleBooks(version)
      .pipe(
        map(response => {
          var books: BibleBook[] = []
          response['data'].forEach(value => {
            books.push({
              name: value['name'],
              short: value['short'],
              number: value['book_nr']
            })
          });
          return books
        }),
        mergeMap(books => {
          return [
            new fromBibleSearchActions.GetBibleBooksSuccess(books),
            new fromBibleActions.SelectBooks(books),
            new fromBibleActions.SelectBook(books[0], version)
          ]
        }),
        catchError(error => of(new fromBibleSearchActions.GetBibleBooksFail(error)))
      )}
    )
  );

  @Effect()
  getBibleChapters$ = this.action$.ofType(fromBibleSearchActions.GET_BIBLE_CHAPTERS, fromBibleActions.SELECT_BOOK).pipe(
    switchMap(payload => this.bibleService
      .getBibleChapters(payload['book'], payload['version'])
      .pipe(
        map(response => {
          var chapters = Object.keys(response).map((key, index) => {
            var chapter = new BibleChapter
            chapter.number = Number(key)
            var verses: BibleVerse[] = []
            response[key].forEach(value => {
              var verse = new BibleVerse
              verse.bbl_book_id = value['bbl_book_id']
              verse.chapter_nr = value['chapter_nr']
              verse.verse_nr = value['verse_nr']
              verse.verse = value['verse']
              verses.push(verse)
            })
            chapter.verses = verses
            return chapter
          })
          return chapters
        }),
        mergeMap(chapters => {
          return [
            new fromBibleSearchActions.GetBibleChaptersSuccess(chapters),
            new fromBibleActions.SelectChapters(chapters),
            new fromBibleActions.SelectChapter(chapters[0])
          ]
        }),
        catchError(error => of(new fromBibleSearchActions.GetBibleChaptersFail(error)))
      )
    )
  );
}
