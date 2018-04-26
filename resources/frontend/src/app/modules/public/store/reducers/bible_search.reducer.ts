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
    case fromBibleSearchAction.GET_BIBLE_CHAPTERS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromBibleSearchAction.GET_BIBLE_CHAPTERS_SUCCESS: {
      const chapters = action.payload;
      console.log("bibleChapters = ", chapters)
      return {
        ...state,
        loading: false,
        loaded: true,
        bibleSearch: {
          ...state.bibleSearch,
          chapters: chapters
        }
      };
    }
    case fromBibleSearchAction.GET_BIBLE_CHAPTERS_FAIL: {
      const error = action;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
    case fromBibleSearchAction.GET_BIBLE_BOOKS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromBibleSearchAction.GET_BIBLE_BOOKS_SUCCESS: {
      const books = action.payload['data'];
      console.log("bibleBooks = ", books)
      return {
        ...state,
        loading: false,
        loaded: true,
        bibleSearch: {...state.bibleSearch, books: books}
      };
    }
    case fromBibleSearchAction.GET_BIBLE_BOOKS_FAIL: {
      const error = action;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
    case fromBibleSearchAction.GET_BIBLE_VERSSIONS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromBibleSearchAction.GET_BIBLE_VERSSIONS_SUCCESS: {
      const versions = action.payload['data'];
      console.log("bibleVersions = ", versions)
      return {
        ...state,
        loading: false,
        loaded: true,
        bibleSearch: {...state.bibleSearch, versions: versions}
      };
    }
    case fromBibleSearchAction.GET_BIBLE_VERSSIONS_FAIL: {
      const error = action;
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      };
    }
    case fromBibleSearchAction.SEARCH_BIBLE: {
      return {
        ...state,
        loading: true
      };
    }
    case fromBibleSearchAction.SEARCH_BIBLE_SUCCESS: {
      const bibleSearch = action.payload['data'];
      console.log("bibleSearch = ", bibleSearch)
      return {
        ...state,
        loading: false,
        loaded: true,
        bibleSearch
      };
    }
    case fromBibleSearchAction.SEARCH_BIBLE_FAIL: {
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
