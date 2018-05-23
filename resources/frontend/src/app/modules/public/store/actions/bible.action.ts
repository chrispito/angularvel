import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';
import { BibleVersion, BibleLanguage, BibleBook, BibleChapter, BibleVerse } from '../../models';

export const SELECT_LANGUAGE = '[Application] Select Language';
export const SELECT_LANGUAGES = '[Application] Select Languages';

export class SelectLanguage implements Action {
  readonly type = SELECT_LANGUAGE;
  constructor(public language: BibleLanguage) {}
}

export class SelectLanguages implements Action {
  readonly type = SELECT_LANGUAGES;
  constructor(public languages: BibleLanguage[]) {}
}

export const SELECT_VERSION = '[Application] Select version';
export const SELECT_VERSIONS = '[Application] Select versions';
export class SelectVersion implements Action {
  readonly type = SELECT_VERSION;
  constructor(public version: BibleVersion) {}
}

export class SelectVersions implements Action {
  readonly type = SELECT_VERSIONS;
  constructor(public versions: BibleVersion[]) {}
}

export const SELECT_BOOK = '[Application] Select Book';
export const SELECT_BOOKS = '[Application] Select Books';

export class SelectBook implements Action {
  readonly type = SELECT_BOOK;
  constructor(public book: BibleBook, public version: BibleVersion) {}
}

export class SelectBooks implements Action {
  readonly type = SELECT_BOOKS;
  constructor(public books: BibleBook[]) {}
}

export const SELECT_CHAPTER = '[Application] Select Chapter';
export const SELECT_CHAPTERS = '[Application] Select Chapters';

export class SelectChapter implements Action {
  readonly type = SELECT_CHAPTER;
  constructor(public chapter: BibleChapter, public book: BibleBook, public version: BibleVersion) {}
}

export class SelectChapters implements Action {
  readonly type = SELECT_CHAPTERS;
  constructor(public chapters: BibleChapter[]) {}
}

export const SELECT_VERSE = '[Application] Select Verse';
export const SELECT_VERSES = '[Application] Select Verses';
export class SelectVerse implements Action {
  readonly type = SELECT_VERSE;
  constructor(public verse: BibleVerse) {}
}

export class SelectVerses implements Action {
  readonly type = SELECT_VERSES;
  constructor(public verses: BibleVerse[]) {}
}

/**
 * Action Types
 */
export type BibleAction =
  | SelectLanguage
  | SelectLanguages
  | SelectVersion
  | SelectVersions
  | SelectBook
  | SelectBooks
  | SelectChapter
  | SelectChapters
  | SelectVerse
  | SelectVerses
