import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable'

import * as fromStore from '../../store'
import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizzas$ = this.store.select<any>(fromStore.getAllPizzas);
    this.store.dispatch(new fromStore.LoadPizzas())
  }
}
