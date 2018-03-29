import * as fromBibleSearchAction from '../actions/bible_search.action';
import { BibleSearch } from '../../models/bible_search.model';

export interface BibleSearchState {
  bibleSearch: BibleSearch;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const initialState = {
  bibleSearch: null,
  loaded: false,
  loading: false,
  error: null
};

export function reducer(
  state = initialState,
  action: fromBibleSearchAction.BibleSearchAction
): BibleSearchState {
  switch (action.type) {
    case fromBibleSearchAction.LOAD_BIBLE_VERSION: {
      return {
        ...state,
        loading: true
      };
    }
    case fromBibleSearchAction.LOAD_BIBLE_VERSION_SUCCESS: {
      const bibleSearch = action.payload['data'];
      console.log("bibleSearch = ", bibleSearch)
      return {
        ...state,
        loading: false,
        loaded: true,
        bibleSearch
      };
    }
    case fromBibleSearchAction.LOAD_BIBLE_VERSION_FAIL: {
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

export const getBibleSearchLoading = (state: BibleSearchState) => state.loading;
export const getBibleSearchLoaded = (state: BibleSearchState) => state.loaded;
export const getBibleSearchError = (state: BibleSearchState) => state.error;
export const getBibleSearchData = (state: BibleSearchState) => state.bibleSearch;
