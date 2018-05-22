import * as fromBible from '../actions/bible.action';
import * as fromBibleSearch from '../actions/bible_search.action';
import { User } from '../../models/user.model';
import { BibleVersion, BibleBook, BibleChapter, BibleVerse } from '../../models';

export interface BibleState {
  version: BibleVersion;
  versions: BibleVersion[];
  book: BibleBook;
  books: BibleBook[];
  chapter: BibleChapter;
  chapters: BibleChapter[];
  verse: BibleVerse;
  verses: BibleVerse[];
}

export const initialState = {
  version: null,
  versions: [],
  book: null,
  books: [],
  chapter: null,
  chapters: [],
  verse: null,
  verses: []
};

export function reducer(
  state = initialState,
  action: fromBible.BibleAction
): BibleState {
  switch (action.type) {
    case fromBible.SELECT_VERSION: {
      const version = action.version;
      return {
        ...state,
        version
      };
    }
    case fromBible.SELECT_VERSIONS: {
      const versions = action.versions;
      return {
        ...state,
        versions
      };
    }
    case fromBible.SELECT_BOOK: {
      const book = action.book;
      return {
        ...state,
        book
      };
    }
    case fromBible.SELECT_BOOKS: {
      const books = action.books;
      return {
        ...state,
        books
      };
    }
    case fromBible.SELECT_CHAPTER: {
      const chapter = action.chapter;
      return {
        ...state,
        chapter
      };
    }
    case fromBible.SELECT_CHAPTERS: {
      const chapters = action.chapters;
      return {
        ...state,
        chapters
      };
    }
    case fromBible.SELECT_VERSE: {
      const verse = action.verse;
      return {
        ...state,
        verse
      };
    }
    case fromBible.SELECT_VERSES: {
      const verses = action.verses;
      return {
        ...state,
        verses
      };
    }
  }

  return state;
}

export const getBibleVersion = (state: BibleState) => state.version;
export const getBibleVerse = (state: BibleState) => state.verse;
export const getBibleChapter = (state: BibleState) => state.chapter;
export const getBibleBook = (state: BibleState) => state.book;
export const getBibleSelection = (state: BibleState) => state;
