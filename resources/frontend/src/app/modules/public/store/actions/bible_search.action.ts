import { Action } from '@ngrx/store';
import { BibleSearch } from '../../models/bible_search.model';

/**
 * Load Bible Version
 */
export const LOAD_BIBLE_VERSION = '[Application] Load Bible Version';
export const LOAD_BIBLE_VERSION_FAIL = '[Application] Load Bible Version Fail';
export const LOAD_BIBLE_VERSION_SUCCESS = '[Application] Load Bible Version Success';

export class LoadBibleVersion implements Action {
  readonly type = LOAD_BIBLE_VERSION;
}

export class LoadBibleVersionFail implements Action {
  readonly type = LOAD_BIBLE_VERSION_FAIL;
  constructor(public payload: any) {}
}

export class LoadBibleVersionSuccess implements Action {
  readonly type = LOAD_BIBLE_VERSION_SUCCESS;
  constructor(public payload: BibleSearch) {}
}

/**
 * Action Types
 */
export type BibleSearchAction =
  | LoadBibleVersion
  | LoadBibleVersionSuccess
  | LoadBibleVersionFail;
