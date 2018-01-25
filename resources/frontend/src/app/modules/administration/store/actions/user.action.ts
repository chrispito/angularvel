import { Action } from "@ngrx/store";
// import { User } from "../../models/User";

/**
 * Load User
 */
export const LOAD_USER = '[Products] Load User';
export const LOAD_USER_FAIL = '[Products] Load User Fail';
export const LOAD_USER_SUCCESS = '[Products] Load User Success';

export class LoadUser implements Action {
    readonly type = LOAD_USER;
}

export class LoadUserFail implements Action {
    readonly type = LOAD_USER_FAIL;
    constructor(public payload: any) {}
}

export class LoadUserSuccess implements Action {
    readonly type = LOAD_USER_SUCCESS;
    constructor(public payload: any) {}
    // constructor(public payload: User) {}
}

/**
 * Action Types
 */
export  type UserAction = LoadUser | LoadUserSuccess | LoadUserFail;