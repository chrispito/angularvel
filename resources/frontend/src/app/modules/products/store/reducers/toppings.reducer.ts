import { Topping } from "../../models/topping.model";
import * as fromTopping from "../actions/toppings.action";

export interface ToppingState {
    data: Topping[],
    loaded: boolean,
    loading: boolean
}

export const initialState = {
    data: [
        {
          "id": 10,
          "name": "pepperoni"
        },
        {
          "id": 9,
          "name": "pepper"
        },
        {
          "id": 3,
          "name": "basil"
        },
        {
          "id": 4,
          "name": "chili"
        },
        {
          "id": 7,
          "name": "olive"
        },
        {
          "id": 2,
          "name": "bacon"
        }
      ],
    loaded: false,
    loading: false
}

export function reducer(
    state = initialState,
    action: fromTopping.ToppingsAction
):ToppingState {

    switch(action.type) {
        case fromTopping.LOAD_TOPPING:{
            return {
                ...state,
                loading: true
            }
        }
        case fromTopping.LOAD_TOPPING_SUCCESS:{
            return {
                ...state,
                loading: false,
                loaded: true
            }
        }
        case fromTopping.LOAD_TOPPING_FAIL:{
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }
    }

    return state;
}

export const getToppingsLoading = (state: ToppingState) => state.loading;
export const getToppingsLoaded = (state: ToppingState) => state.loaded;
export const getToppings = (state: ToppingState) => state.data;