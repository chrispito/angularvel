import { Action } from '@ngrx/store';
import { BibleSearch } from '../../models/bible_search.model';

/**
 * Search Bible
 */
export const SEARCH_BIBLE = '[Application] Search Bible';
export const SEARCH_BIBLE_FAIL = '[Application] Search Bible Fail';
export const SEARCH_BIBLE_SUCCESS = '[Application] Search Bible Success';

export class SearchBible implements Action {
  readonly type = SEARCH_BIBLE;
  constructor(public searchData: any) {}
}

export class SearchBibleFail implements Action {
  readonly type = SEARCH_BIBLE_FAIL;
  constructor(public payload: any) {}
}

export class SearchBibleSuccess implements Action {
  readonly type = SEARCH_BIBLE_SUCCESS;
  constructor(public payload: BibleSearch) {}
}

/**
 * Action Types
 */
export type BibleSearchAction =
  | SearchBible
  | SearchBibleSuccess
  | SearchBibleFail;
