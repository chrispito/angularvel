import { Pizza } from "../../models/pizza.model";
import * as fromPizzas from "../actions/pizzas.action";

export interface PizzaState {
    data: Pizza[],
    loaded: boolean,
    loading: boolean
}

export const initialState = {
    data: [],
    loaded: false,
    loading: false
}

export function reducer(
    state = initialState,
    action: fromPizzas.PizzasAction
):PizzaState {

    switch(action.type) {
        case fromPizzas.LOAD_PIZZAS:{
            return {
                ...state,
                loading: true
            }
        }
        case fromPizzas.LOAD_PIZZAS_SUCCESS:{
            const data = action.payload;
            console.log("PizzasReducer user = ", data)
            return {
                ...state,
                loading: false,
                loaded: true,
                data
            }
        }
        case fromPizzas.LOAD_PIZZAS_FAIL:{
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }
    }

    return state;
}

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
export const getPizzas = (state: PizzaState) => state.data;
export const getPizzaById = (state: PizzaState, id: number) => state.data.filter(dt => dt.id == id);