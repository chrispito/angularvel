import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store'

import * as fromUser from './user.reducer';
import * as fromPages from './pages.reducer';
import * as fromBible from './bible.reducer';
import * as fromBibleSearch from './bible_search.reducer';


export interface WebPublicState {
    user: fromUser.UserState;
    pages: fromPages.PagesState;
    bibleSearch: fromBibleSearch.BibleSearchState;
    bible: fromBible.BibleState;
}

export const reducers: ActionReducerMap<WebPublicState> = {
    user: fromUser.reducer,
    pages: fromPages.reducer,
    bibleSearch: fromBibleSearch.reducer,
    bible: fromBible.reducer,
};

export const getWebPublicState = createFeatureSelector<WebPublicState>(
    'webPublic'
);

/**
 * User State
 */
export const getUserState = createSelector(getWebPublicState, (state: WebPublicState) => state.user);
export const getUser = createSelector(getUserState, fromUser.getUser);
export const getUserLoaded = createSelector(getUserState, fromUser.getUserLoaded);
export const getUserLoading = createSelector(getUserState, fromUser.getUserLoading);
export const getRegistered = createSelector(getUserState, fromUser.getRegistered);
export const getLoginLoaded = createSelector(getUserState, fromUser.getLoginLoaded);
export const getLoginLoading = createSelector(getUserState, fromUser.getLoginLoading);

/**
 * Page State
 */
export const getPagesState = createSelector(getWebPublicState, (state: WebPublicState) => state.pages);
export const getAboutPage = createSelector(getPagesState, fromPages.getAboutPage);
export const getPagesLoaded = createSelector(getPagesState, fromPages.getPagesLoaded);
export const getPagesLoading = createSelector(getPagesState, fromPages.getPagesLoading);
export const getPagesError = createSelector(getPagesState, fromPages.getPagesError);

/**
 * Bible Search State
 */
export const getBibleSearchState = createSelector(getWebPublicState, (state: WebPublicState) => state.bibleSearch);
export const getBibleSearchResult = createSelector(getBibleSearchState, fromBibleSearch.getBibleSearchResult);
// export const getBibleSearchedVersions = createSelector(getBibleSearchState, fromBibleSearch.getBibleSearchedVersions);
// export const getBibleSearchedBooks = createSelector(getBibleSearchState, fromBibleSearch.getBibleSearchedBooks);
export const getBibleSearchLoaded = createSelector(getBibleSearchState, fromBibleSearch.getBibleSearchLoaded);
export const getBibleSearchLoading = createSelector(getBibleSearchState, fromBibleSearch.getBibleSearchLoading);
export const getBibleSearchError = createSelector(getBibleSearchState, fromBibleSearch.getBibleSearchError);

/**
 * Bible State
 */
export const getBiblState = createSelector(getWebPublicState, (state: WebPublicState) => state.bible);
export const getBibleVersion = createSelector(getBiblState, fromBible.getBibleVersion);
export const getBibleSelectionState = createSelector(getBiblState, fromBible.getBibleSelection);