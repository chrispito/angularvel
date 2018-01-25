import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as fromActions from "../actions";
import * as fromServices from "../../services";

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private privateServices: fromServices.UserService
  ) {}

  @Effect()
  loadUser$ = this.action$.ofType(fromActions.LOAD_USER).pipe(
    switchMap(() => {
      return this.privateServices
        .getUser()
        .pipe(
          map(user => new fromActions.LoadUserSuccess(user)),
          catchError(error => of(new fromActions.LoadUserFail(error)))
        );
    })
  );
}
