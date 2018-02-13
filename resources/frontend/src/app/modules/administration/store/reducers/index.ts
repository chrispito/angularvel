import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

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
