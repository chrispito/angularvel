import { Action } from '@ngrx/store';
import { BibleSearchResult, BibleBook, BibleChapter, BibleVersion, SearchData, BibleLanguage, BibleVerse } from '../../models';

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
 * Get Bible Language
 */
export const GET_BIBLE_LANGUAGES = '[Application] Search Bible Language';
export const GET_BIBLE_LANGUAGES_FAIL = '[Application] Search Bible Language Fail';
export const GET_BIBLE_LANGUAGES_SUCCESS = '[Application] Search Bible Language Success';

export class GetBibleLanguages implements Action {
  readonly type = GET_BIBLE_LANGUAGES;
  constructor() {}
}

export class GetBibleLanguagesFail implements Action {
  readonly type = GET_BIBLE_LANGUAGES_FAIL;
  constructor(public payload: any) {}
}

export class GetBibleLanguagesSuccess implements Action {
  readonly type = GET_BIBLE_LANGUAGES_SUCCESS;
  constructor(public payload: BibleLanguage[]) {}
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
  constructor(public language: BibleLanguage) {}
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
 * Get Bible Verses
 */
export const GET_BIBLE_VERSES = '[Application] Search Bible Verse';
export const GET_BIBLE_VERSES_FAIL = '[Application] Search Bible Verse Fail';
export const GET_BIBLE_VERSES_SUCCESS = '[Application] Search Bible Verse Success';

export class GetBibleVerses implements Action {
  readonly type = GET_BIBLE_VERSES;
  constructor(public chapter: BibleChapter, public book: BibleBook, public language: BibleLanguage) {}
}

export class GetBibleVersesFail implements Action {
  readonly type = GET_BIBLE_VERSES_FAIL;
  constructor(public payload: any) {}
}

export class GetBibleVersesSuccess implements Action {
  readonly type = GET_BIBLE_VERSES_SUCCESS;
  constructor(public payload: BibleVerse[]) {}
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
  | GetBibleLanguages
  | GetBibleLanguagesSuccess
  | GetBibleLanguagesFail
  | GetBibleChapters
  | GetBibleChaptersSuccess
  | GetBibleChaptersFail
  | GetBibleBooks
  | GetBibleBooksSuccess
  | GetBibleBooksFail
  | GetBibleVerses
  | GetBibleVersesSuccess
  | GetBibleVersesFail
  | GetBibleVersions
  | GetBibleVersionsSuccess
  | GetBibleVersionsFail
  | SearchBible
  | SearchBibleSuccess
  | SearchBibleFail;
