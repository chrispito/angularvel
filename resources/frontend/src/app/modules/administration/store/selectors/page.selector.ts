import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromPages from '../reducers/pages.reducer';

export const getPagesState = createSelector(fromFeature.getWebAdminState, (state: fromFeature.WebAdminState) => state.pages);
export const getAboutPage = createSelector(getPagesState, fromPages.getAboutPage);
export const getPagesLoaded = createSelector(getPagesState, fromPages.getPagesLoaded);
export const getPagesLoading = createSelector(getPagesState, fromPages.getPagesLoading);
export const getPagesError = createSelector(getPagesState, fromPages.getPagesError);
