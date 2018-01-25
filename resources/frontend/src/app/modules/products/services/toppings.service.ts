import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Topping } from '../models/topping.model';

@Injectable()
export class ToppingsService {
  constructor(private http: HttpClient) {}

  getToppings(): Observable<Topping[]> {
    return this.http
      .get<Topping[]>(`http://localhost:4200/assets/db/db.json`)
      .pipe(
        map(datas => datas['toppings']),
        catchError((error: any) => Observable.throw(error.json)
      )
    );
  }
}
