import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store'

import * as fromUser from "./user.reducer";


export interface AppState {
    user: fromUser.UserState
}

export const reducers: ActionReducerMap<AppState> = {
    user: fromUser.reducer,
}

export const getAppState = createFeatureSelector<AppState>(
    'application'
);

/**
 * User State
 */
export const getUserState = createSelector(getAppState, (state: AppState) => state.user);
export const getUser = createSelector(getUserState, fromUser.getUser);
export const getUserLoaded = createSelector(getUserState, fromUser.getUserLoaded);
export const getuserLoading = createSelector(getUserState, fromUser.getUserLoading);
