import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromUser from './user.reducer';
import * as fromPages from './pages.reducer';


export interface WebAdminState {
    user: fromUser.UserState;
    pages: fromPages.PagesState;
}

export const reducers: ActionReducerMap<WebAdminState> = {
    user: fromUser.reducer,
    pages: fromPages.reducer,
};

export const getWebAdminState = createFeatureSelector<WebAdminState>(
    'webAdmin'
);

/**
 * User State
 */
export const getUserState = createSelector(getWebAdminState, (state: WebAdminState) => state.user);
export const getUser = createSelector(getUserState, fromUser.getUser);
export const getUserLoaded = createSelector(getUserState, fromUser.getUserLoaded);
export const getUserLoading = createSelector(getUserState, fromUser.getUserLoading);
export const getLoginLoaded = createSelector(getUserState, fromUser.getLoginLoaded);
export const getLoginLoading = createSelector(getUserState, fromUser.getLoginLoading);

export const getPagesState = createSelector(getWebAdminState, (state: WebAdminState) => state.pages);
export const getAboutPage = createSelector(getPagesState, fromPages.getAboutPage);
export const getPagesLoaded = createSelector(getPagesState, fromPages.getPagesLoaded);
export const getPagesLoading = createSelector(getPagesState, fromPages.getPagesLoading);
export const getPagesError = createSelector(getPagesState, fromPages.getPagesError);
