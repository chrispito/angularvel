import * as fromUser from '../actions/user.action';
import { User } from '../../models/user.model';
import * as fromUtils from '../../models/utils';

export interface UserState {
  user: User;
  loaded: boolean;
  loading: boolean;
  loginLoaded: boolean;
  loginLoading: boolean;
  error: any;
}

export const initialState = {
  user: null,
  loaded: false,
  loading: false,
  loginLoaded: false,
  loginLoading: false,
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
        user: fromUtils.getUser(user)
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
      localStorage.setItem('JLD_USER_ADMIN_TOKEN', JSON.stringify(token));
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
    case fromUser.USER_LOGOUT: {
      localStorage.removeItem('JLD_USER_ADMIN_TOKEN');
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
export const getUserError = (state: UserState) => state.error;
export const getUser = (state: UserState) => state.user;
export const getLoginLoading = (state: UserState) => state.loginLoading;
export const getLoginLoaded = (state: UserState) => state.loginLoaded;
