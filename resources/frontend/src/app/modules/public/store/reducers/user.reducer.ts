import * as fromUser from '../actions/user.action';
import { User } from '../../models/user.model';

export interface UserState {
  user: User;
  loaded: boolean;
  loading: boolean;
  loginLoaded: boolean;
  loginLoading: boolean;
  isRegistered: boolean;
  error: any;
}

export const initialState = {
  user: null,
  loaded: false,
  loading: false,
  loginLoaded: false,
  loginLoading: false,
  isRegistered: false,
  error: null
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
      const user = action.payload['data'];
      return {
        ...state,
        loading: false,
        loaded: true,
        user
      };
    }
    case fromUser.LOAD_USER_FAIL: {
      const error = action;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
    case fromUser.USER_LOGIN: {
      return {
        ...state,
        loginLoading: true
      };
    }
    case fromUser.USER_LOGIN_SUCCESS: {
      const token = action.payload;
      localStorage.setItem('JLD-USER-TOKEN', JSON.stringify(token));
      return {
        ...state,
        loginLoading: false,
        loginLoaded: true
      };
    }
    case fromUser.USER_LOGIN_FAIL: {
      const error = action;
      return {
        ...state,
        loginLoading: false,
        loginLoaded: false,
        error
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
        loaded: true,
        isRegistered: true,
      };
    }
    case fromUser.USER_REGISTER_FAIL: {
      const error = action;
      return {
        ...state,
        loading: false,
        loaded: false,
        isRegistered: false,
        error
      };
    }
    case fromUser.USER_REGISTER_RESET: {
      return {
        ...state,
        isRegistered: false,
      };
    }
    case fromUser.USER_LOGOUT: {
      localStorage.removeItem('JLD-USER-TOKEN');
      return {
        ...state,
        loading: false,
        loaded: false,
        loginLoaded: false,
        user: undefined
      };
    }
  }

  return state;
}

export const getUserLoading = (state: UserState) => state.loading;
export const getUserLoaded = (state: UserState) => state.loaded;
export const getRegistered = (state: UserState) => state.isRegistered;
export const getUserError = (state: UserState) => state.error;
export const getUser = (state: UserState) => state.user;
export const getLoginLoading = (state: UserState) => state.loginLoading;
export const getLoginLoaded = (state: UserState) => state.loginLoaded;
