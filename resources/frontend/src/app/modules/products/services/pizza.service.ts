import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { switchMap, map, catchError } from "rxjs/operators";
import 'rxjs/add/observable/throw';

import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzaService {
  constructor(private http: HttpClient) {}

  getPizzas(): Observable<Pizza[]> {
    return this.http
      .get<Pizza[]>(`http://localhost:4200/assets/db/db.json`)
      .pipe(
        map(datas => datas['pizzas']),
        catchError((error: any) => Observable.throw(error.json())
      )
    );
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .post<Pizza>(`http://localhost:4200/assets/db/db.json`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json)));
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .put<Pizza>(`http://localhost:4200/assets/db/db.json/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json)));
  }

  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .delete<any>(`/http://localhost:4200/assets/db/db.json/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json)));
  }
}
