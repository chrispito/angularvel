import { Action } from "@ngrx/store";
import { User } from "../../models/user.model";

/**
 * Load User
 */
export const LOAD_USER = "[Application] Load User";
export const LOAD_USER_FAIL = "[Application] Load User Fail";
export const LOAD_USER_SUCCESS = "[Application] Load User Success";

export class LoadUser implements Action {
  readonly type = LOAD_USER;
}

export class LoadUserFail implements Action {
  readonly type = LOAD_USER_FAIL;
  constructor(public payload: any) {}
}

export class LoadUserSuccess implements Action {
  readonly type = LOAD_USER_SUCCESS;
  constructor(public payload: User) {}
}

/**
 * User Login
 */
export const USER_LOGIN = "[Application] User Login";
export const USER_LOGIN_FAIL = "[Application] User Login Fail";
export const USER_LOGIN_SUCCESS = "[Application] User Login Success";

export class UserLogin implements Action {
  readonly type = USER_LOGIN;
  constructor(public userData: any) {}
}

export class UserLoginFail implements Action {
  readonly type = USER_LOGIN_FAIL;
  constructor(public payload: any) {}
}

export class UserLoginSuccess implements Action {
  readonly type = USER_LOGIN_SUCCESS;
  constructor(public payload: any) {}
}

/**
 * User Register
 */
export const USER_REGISTER = "[Application] User Register";
export const USER_REGISTER_FAIL = "[Application] User Register Fail";
export const USER_REGISTER_SUCCESS = "[Application] User Register Success";

export class UserRegister implements Action {
  readonly type = USER_REGISTER;
  constructor(public userData: any) {}
}

export class UserRegisterFail implements Action {
  readonly type = USER_REGISTER_FAIL;
  constructor(public payload: any) {}
}

export class UserRegisterSuccess implements Action {
  readonly type = USER_REGISTER_SUCCESS;
  constructor(public payload: any) {}
}

/**
 * Logout User
 */
export const USER_LOGOUT = "[Application] User Logout";

export class UserLogout implements Action {
  readonly type = USER_LOGOUT;
}

/**
 * Action Types
 */
export type UserAction =
  | LoadUser
  | LoadUserSuccess
  | LoadUserFail
  | UserLogout
  | UserLogin
  | UserLoginSuccess
  | UserLoginFail
  | UserRegister
  | UserRegisterSuccess
  | UserRegisterFail;
