import * as fromPages from '../actions/pages.action';
import { User } from '../../models/user.model';
import { About } from '../../models/about_page.model';

export interface PagesState {
  aboutPage: About;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const initialState = {
  aboutPage: null,
  loaded: false,
  loading: false,
  error: null
};

export function reducer(
  state = initialState,
  action: fromPages.AboutPageAction
): PagesState {
  switch (action.type) {
    case fromPages.LOAD_ABOUT_PAGE: {
      return {
        ...state,
        loading: true
      };
    }
    case fromPages.LOAD_ABOUT_PAGE_SUCCESS: {
      const aboutPage = action.payload['data'];
      return {
        ...state,
        loading: false,
        loaded: true,
        aboutPage
      };
    }
    case fromPages.LOAD_ABOUT_PAGE_FAIL: {
      const error = action;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
    case fromPages.UPDATE_ABOUT_PAGE: {
      return {
        ...state,
        loading: true
      };
    }
    case fromPages.UPDATE_ABOUT_PAGE_SUCCESS: {
      const aboutPage = action.payload['data'];
      return {
        ...state,
        loading: false,
        loaded: true,
        aboutPage
      };
    }
    case fromPages.UPDATE_ABOUT_PAGE_FAIL: {
      const error = action;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
  }
  return state;
}

export const getPagesLoading = (state: PagesState) => state.loading;
export const getPagesLoaded = (state: PagesState) => state.loaded;
export const getPagesError = (state: PagesState) => state.error;
export const getAboutPage = (state: PagesState) => state.aboutPage;
