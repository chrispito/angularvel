import * as fromBibleSearchAction from '../actions/bible_search.action'
import * as fromBibleAction from '../actions/bible.action'
import { BibleSearchResult, BibleChapter, BibleVerse, BibleBook, BibleVersion } from '../../models'

export interface BibleSearchState {
  bibleSearch: BibleSearchResult
  loaded: boolean
  loading: boolean
  error: any
}

export const initialState = {
  bibleSearch: new BibleSearchResult,
  loaded: false,
  loading: false,
  error: null
}

export function reducer(
  state = initialState,
  action: fromBibleSearchAction.BibleSearchAction
): BibleSearchState {
  switch (action.type) {
    case fromBibleSearchAction.GET_BIBLE_CHAPTERS: {
      return {
        ...state,
        loading: true
      }
    }
    case fromBibleSearchAction.GET_BIBLE_CHAPTERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        bibleSearch: {
          ...state.bibleSearch,
          chapters: action.payload
        }
      }
    }
    case fromBibleSearchAction.GET_BIBLE_CHAPTERS_FAIL: {
      const error = action
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      }
    }
    case fromBibleSearchAction.GET_BIBLE_BOOKS: {
      return {
        ...state,
        loading: true
      }
    }
    case fromBibleSearchAction.GET_BIBLE_BOOKS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        bibleSearch: {
          ...state.bibleSearch,
          books: action.payload
        }
      }
    }
    case fromBibleSearchAction.GET_BIBLE_BOOKS_FAIL: {
      const error = action
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      }
    }
    case fromBibleSearchAction.GET_BIBLE_VERSSIONS: {
      return {
        ...state,
        loading: true
      }
    }
    case fromBibleSearchAction.GET_BIBLE_VERSSIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        bibleSearch: {
          ...state.bibleSearch,
          versions: action.payload
        }
      }
    }
    case fromBibleSearchAction.GET_BIBLE_VERSSIONS_FAIL: {
      const error = action
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      }
    }
    case fromBibleSearchAction.SEARCH_BIBLE: {
      return {
        ...state,
        loading: true
      }
    }
    case fromBibleSearchAction.SEARCH_BIBLE_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        bibleSearch: {
          ...state.bibleSearch,
          chapters: action.payload.chapters,
          requestData: action.payload.requestData,
        }
      }
    }
    case fromBibleSearchAction.SEARCH_BIBLE_FAIL: {
      console.log("action F = ", action)
      const error = action
      return {
        ...state,
        loading: false,
        loaded: false,
        error
      }
    }
  }
  return state
}

export const getBibleSearchLoading = (state: BibleSearchState) => state.loading
export const getBibleSearchLoaded = (state: BibleSearchState) => state.loaded
export const getBibleSearchError = (state: BibleSearchState) => state.error
export const getBibleSearchResult = (state: BibleSearchState) => state.bibleSearch
// export const getBibleSearchedVersions = (state: BibleSearchState) => state.bibleSearch.versions
// export const getBibleSearchedBooks = (state: BibleSearchState) => state.bibleSearch.books
