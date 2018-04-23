import { Action } from '@ngrx/store';
import { BibleSearch } from '../../models/bible_search.model';

/**
 * Get Bible Versions
 */
export const GET_BIBLE_VERSSIONS = '[Application] Search Bible';
export const GET_BIBLE_VERSSIONS_FAIL = '[Application] Search Bible Fail';
export const GET_BIBLE_VERSSIONS_SUCCESS = '[Application] Search Bible Success';

export class GetBibleVersions implements Action {
  readonly type = GET_BIBLE_VERSSIONS;
  constructor() {}
}

export class GetBibleVersionsFail implements Action {
  readonly type = GET_BIBLE_VERSSIONS_FAIL;
  constructor(public payload: any) {}
}

export class GetBibleVersionsSuccess implements Action {
  readonly type = GET_BIBLE_VERSSIONS_SUCCESS;
  constructor(public payload: any) {}
}
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
  | GetBibleVersions
  | GetBibleVersionsSuccess
  | GetBibleVersionsFail
  | SearchBible
  | SearchBibleSuccess
  | SearchBibleFail;
