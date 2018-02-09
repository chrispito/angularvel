import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromActions from '../actions';
import * as fromServices from '../../services';
import { toPayload } from '@ngrx/effects/src/util';

@Injectable()
export class PagesEffects {
  constructor(
    private action$: Actions,
    private privateServices: fromServices.PagesService
  ) { }

  @Effect()
  loadAbout$ = this.action$.ofType(fromActions.LOAD_ABOUT_PAGE).pipe(
    switchMap(() => this.privateServices
      .getAbout()
      .pipe(
      map(about => new fromActions.LoadAboutPageSuccess(about)),
      catchError(error => of(new fromActions.LoadAboutPageFail(error)))
      )
    )
  );

  @Effect()
  updateAbout$ = this.action$.ofType(fromActions.UPDATE_ABOUT_PAGE).pipe(
    switchMap(payload => this.privateServices
      .updateAbout(payload['pageData'])
      .pipe(
      map(about => new fromActions.UpdateAboutPageSuccess(about)),
      catchError(error => of(new fromActions.UpdateAboutPageFail(error)))
      )
    )
  );

}
