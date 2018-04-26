import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromActions from '../actions/bible_search.action';
import * as fromServices from '../../services';
import { toPayload } from '@ngrx/effects/src/util';

@Injectable()
export class BibleSearchEffects {
  constructor(
    private action$: Actions,
    private bibleService: fromServices.BibleSearchService
  ) { }

  // @Effect()
  // loadBibles$ = this.action$.ofType(fromActions.SEARCH_BIBLE).pipe(
  //   switchMap(() => this.bibleService
  //     .search()
  //     .pipe(
  //       map(search => new fromActions.SearchBibleSuccess(search)),
  //       catchError(error => of(new fromActions.SearchBibleFail(error)))
  //     )
  //   )
  // );

  @Effect()
  getBibleVersions$ = this.action$.ofType(fromActions.GET_BIBLE_VERSSIONS).pipe(
    switchMap(() => this.bibleService
      .getBibleVersions()
      .pipe(
        map(versions => new fromActions.GetBibleVersionsSuccess(versions)),
        catchError(error => of(new fromActions.GetBibleVersionsFail(error)))
      )
    )
  );

  @Effect()
  getBibleBooks$ = this.action$.ofType(fromActions.GET_BIBLE_BOOKS).pipe(
    switchMap(version => this.bibleService
      .getBibleBooks(version['version'])
      .pipe(
        map(books => new fromActions.GetBibleBooksSuccess(books)),
        catchError(error => of(new fromActions.GetBibleBooksFail(error)))
      )
    )
  );

  @Effect()
  getBibleChapters$ = this.action$.ofType(fromActions.GET_BIBLE_CHAPTERS).pipe(
    switchMap(payload => this.bibleService
      .getBibleChapters(payload['data'])
      .pipe(
        map(books => new fromActions.GetBibleChaptersSuccess(books)),
        catchError(error => of(new fromActions.GetBibleChaptersFail(error)))
      )
    )
  );
}
