import { Action } from "@ngrx/store";
import { Topping } from "../../models/topping.model";

/**
 * Load Toppings
 */
export const LOAD_TOPPING = '[Products] Load Topping';
export const LOAD_TOPPING_FAIL = '[Products] Load Topping Fail';
export const LOAD_TOPPING_SUCCESS = '[Products] Load Topping Success';

export class LoadTopping implements Action {
    readonly type = LOAD_TOPPING;
}

export class LoadToppingFail implements Action {
    readonly type = LOAD_TOPPING_FAIL;
    constructor(public payload: any) {}
}

export class LoadToppingSuccess implements Action {
    readonly type = LOAD_TOPPING_SUCCESS;
    constructor(public payload: Topping[]) {}
}

/**
 * Action Types
 */
export  type ToppingsAction = LoadTopping | LoadToppingSuccess | LoadToppingFail;