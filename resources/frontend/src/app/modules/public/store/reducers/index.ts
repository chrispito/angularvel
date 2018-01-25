import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store'

import * as fromUser from "./user.reducer";


export interface WebPublicState {
    user: fromUser.UserState
}

export const reducers: ActionReducerMap<WebPublicState> = {
    user: fromUser.reducer,
}

export const getWebPublicState = createFeatureSelector<WebPublicState>(
    'webPublic'
);

/**
 * User State
 */
export const getUserState = createSelector(getWebPublicState, (state: WebPublicState) => state.user);
export const getUser = createSelector(getUserState, fromUser.getUser);
export const getUserLoaded = createSelector(getUserState, fromUser.getUserLoaded);
export const getuserLoading = createSelector(getUserState, fromUser.getUserLoading);
