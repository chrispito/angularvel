import { ADD_TODO, REMOVE_TODO } from "../actions/todoActions";

export const initialState = {
    loaded: false,
    loading: false,
    data: [],
  };
  
  export function reducer(
    state = initialState,
    action: { type: string; payload: any }
  ) {
    switch (action.type) {
      case ADD_TODO: {
        const todo = action.payload;
        const data = [...state.data, todo];
        return {
          ...state,
          data,
        };
      }
      case REMOVE_TODO: {
        const todo = action.payload;
        const data = state.data.filter(t => t != todo)
        return {data};
      }
    }
  
    return state;
  }