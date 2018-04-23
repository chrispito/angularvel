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
    private privateServices: fromServices.BibleSearchService
  ) { }

  @Effect()
  loadBibles$ = this.action$.ofType(fromActions.SEARCH_BIBLE).pipe(
    switchMap(() => this.privateServices
      .search()
      .pipe(
      map(search => new fromActions.SearchBibleSuccess(search)),
      catchError(error => of(new fromActions.SearchBibleFail(error)))
      )
    )
  );

  @Effect()
  getBibleVersions$ = this.action$.ofType(fromActions.GET_BIBLE_VERSSIONS).pipe(
    switchMap(() => this.privateServices
      .getBibleVersions()
      .pipe(
      map(versions => new fromActions.GetBibleVersionsSuccess(versions)),
      catchError(error => of(new fromActions.GetBibleVersionsFail(error)))
      )
    )
  );
}
