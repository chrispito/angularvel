import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { switchMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as fromActions from "../actions";
import * as fromServices from "../../services";

@Injectable()
export class PizzasEffects {
  constructor(
    private action$: Actions,
    private privateServices: fromServices.PizzaService
  ) {}

  @Effect()
  loadPizzas$ = this.action$.ofType(fromActions.LOAD_PIZZAS).pipe(
    switchMap(() => {
      return this.privateServices
        .getPizzas()
        .pipe(
          map(pizzas => new fromActions.LoadPizzasSuccess(pizzas)),
          catchError(error => of(new fromActions.LoadPizzasFail(error)))
        );
    })
  );
}
