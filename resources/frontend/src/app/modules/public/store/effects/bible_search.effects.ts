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
  loadBibles$ = this.action$.ofType(fromActions.LOAD_BIBLE_VERSION).pipe(
    switchMap(() => this.privateServices
      .getBibleVersion()
      .pipe(
      map(search => new fromActions.LoadBibleVersionSuccess(search)),
      catchError(error => of(new fromActions.LoadBibleVersionFail(error)))
      )
    )
  );
}
