import * as fromUser from "../actions/user.action";
import { User } from "../../models/user.model";

export interface UserState {
  user: User;
  loaded: boolean;
  loading: boolean;
}

export const initialState = {
  user: null,
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromUser.UserAction
): UserState {
  switch (action.type) {
    case fromUser.LOAD_USER: {
      return {
        ...state,
        loading: true
      };
    }
    case fromUser.LOAD_USER_SUCCESS: {
      const user = action.payload["data"];
      return {
        ...state,
        loading: false,
        loaded: true,
        user
      };
    }
    case fromUser.LOAD_USER_FAIL: {
      const error = action.payload;
      console.log("UserReducer[LOAD_USER_FAIL]: ", error);
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case fromUser.USER_LOGIN: {
      return {
        ...state,
        loading: true
      };
    }
    case fromUser.USER_LOGIN_SUCCESS: {
      const token = action.payload;
      localStorage.setItem("JLD-USER-TOKEN", JSON.stringify(token));
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }
    case fromUser.USER_LOGIN_FAIL: {
      const error = action.payload;
      console.log("UserReducer[USER_LOGIN_FAIL]: ", error);
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case fromUser.USER_REGISTER: {
      return {
        ...state,
        loading: true
      };
    }
    case fromUser.USER_REGISTER_SUCCESS: {
      const token = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }
    case fromUser.USER_REGISTER_FAIL: {
      const error = action.payload;
      console.log("UserReducer[USER_REGISTER_FAIL]: ", error);
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case fromUser.USER_LOGOUT: {
      localStorage.removeItem("JLD-USER-TOKEN");
      return {
        ...state,
        loading: false,
        loaded: false,
        user: undefined
      };
    }
  }

  return state;
}

export const getUserLoading = (state: UserState) => state.loading;
export const getUserLoaded = (state: UserState) => state.loaded;
export const getUser = (state: UserState) => state.user;
