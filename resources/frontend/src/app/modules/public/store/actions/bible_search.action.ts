import { Action } from '@ngrx/store';
import { BibleSearchResult, BibleBook, BibleChapter, BibleVersion, SearchData } from '../../models';

/**
 * Get Bible Chapter
 */
export const GET_BIBLE_CHAPTERS = '[Application] Search Bible Chapter';
export const GET_BIBLE_CHAPTERS_FAIL = '[Application] Search Bible Chapter Fail';
export const GET_BIBLE_CHAPTERS_SUCCESS = '[Application] Search Bible Chapter Success';

export class GetBibleChapters implements Action {
  readonly type = GET_BIBLE_CHAPTERS;
  constructor(public book: BibleBook, public version: BibleVersion) {}
}

export class GetBibleChaptersFail implements Action {
  readonly type = GET_BIBLE_CHAPTERS_FAIL;
  constructor(public payload: any) {}
}

export class GetBibleChaptersSuccess implements Action {
  readonly type = GET_BIBLE_CHAPTERS_SUCCESS;
  constructor(public payload: BibleChapter[]) {}
}

/**
 * Get Bible Books
 */
export const GET_BIBLE_BOOKS = '[Application] Search Bible Books';
export const GET_BIBLE_BOOKS_FAIL = '[Application] Search Bible Books Fail';
export const GET_BIBLE_BOOKS_SUCCESS = '[Application] Search Bible Books Success';

export class GetBibleBooks implements Action {
  readonly type = GET_BIBLE_BOOKS;
  constructor(public version: BibleVersion) {}
}

export class GetBibleBooksFail implements Action {
  readonly type = GET_BIBLE_BOOKS_FAIL;
  constructor(public payload: any) {}
}

export class GetBibleBooksSuccess implements Action {
  readonly type = GET_BIBLE_BOOKS_SUCCESS;
  constructor(public payload: BibleBook[]) {}
}

/**
 * Get Bible Versions
 */
export const GET_BIBLE_VERSSIONS = '[Application] Search Bible Version';
export const GET_BIBLE_VERSSIONS_FAIL = '[Application] Search Bible Version Fail';
export const GET_BIBLE_VERSSIONS_SUCCESS = '[Application] Search Bible Version Success';

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
  constructor(public payload: BibleVersion[]) {}
}
/**
 * Search Bible
 */
export const SEARCH_BIBLE = '[Application] Search Bible';
export const SEARCH_BIBLE_FAIL = '[Application] Search Bible Fail';
export const SEARCH_BIBLE_SUCCESS = '[Application] Search Bible Success';

export class SearchBible implements Action {
  readonly type = SEARCH_BIBLE;
  constructor(public searchData: SearchData) {}
}

export class SearchBibleFail implements Action {
  readonly type = SEARCH_BIBLE_FAIL;
  constructor(public payload: any) {}
}

export class SearchBibleSuccess implements Action {
  readonly type = SEARCH_BIBLE_SUCCESS;
  constructor(public payload: BibleSearchResult) {}
}

/**
 * Action Types
 */
export type BibleSearchAction =
  | GetBibleChapters
  | GetBibleChaptersSuccess
  | GetBibleChaptersFail
  | GetBibleBooks
  | GetBibleBooksSuccess
  | GetBibleBooksFail
  | GetBibleVersions
  | GetBibleVersionsSuccess
  | GetBibleVersionsFail
  | SearchBible
  | SearchBibleSuccess
  | SearchBibleFail;
