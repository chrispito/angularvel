import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store'

import * as fromPizzas from "./pizzas.reducer";
import * as fromToppings from "./toppings.reducer";


export interface ProductsState {
    pizzas: fromPizzas.PizzaState,
    toppings: fromToppings.ToppingState
}

export const reducers: ActionReducerMap<ProductsState> = {
    pizzas: fromPizzas.reducer,
    toppings: fromToppings.reducer
}

export const getProductsState = createFeatureSelector<ProductsState>(
    'products'
);

/**
 * Pizza State
 */
export const getPizzaState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);
export const getAllPizzas = createSelector(getPizzaState, fromPizzas.getPizzas);
export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);
export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);

/**
 * Topping State
 */
export const getToppingState = createSelector(getProductsState, (state: ProductsState) => state.toppings);
export const getAllToppings = createSelector(getToppingState, fromToppings.getToppings);
export const getToppingsLoaded = createSelector(getToppingState, fromToppings.getToppingsLoaded);
export const getToppingsLoading = createSelector(getToppingState, fromToppings.getToppingsLoading);