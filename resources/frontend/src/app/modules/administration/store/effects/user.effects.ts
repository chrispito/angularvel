import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromActions from '../actions';
import * as fromServices from '../../services';
import { toPayload } from '@ngrx/effects/src/util';

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private privateServices: fromServices.UserService
  ) { }

  @Effect()
  loadUser$ = this.action$.ofType(fromActions.LOAD_USER).pipe(
    switchMap(() => this.privateServices
      .getUser()
      .pipe(
      map(user => new fromActions.LoadUserSuccess(user)),
      catchError(error => of(new fromActions.LoadUserFail(error)))
      )
    )
  );

  @Effect()
  userLogin$ = this.action$.ofType(fromActions.USER_LOGIN)
    .switchMap(payload => this.privateServices
      .loginUser(payload['userData'])
      .mergeMap(token =>
        Observable.from([
          new fromActions.UserLoginSuccess(token),
          new fromActions.LoadUser()
        ])
      )
      .catch(error => of(new fromActions.UserLoginFail(error)))
    );

}
