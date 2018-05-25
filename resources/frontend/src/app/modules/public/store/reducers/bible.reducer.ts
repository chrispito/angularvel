import * as fromBible from '../actions/bible.action';
import * as fromBibleSearch from '../actions/bible_search.action';
import { User } from '../../models/user.model';
import { BibleLanguage, BibleVersion, BibleBook, BibleChapter, BibleVerse } from '../../models';

export interface BibleState {
  language: string;
  languages: BibleLanguage[];
  version: string;
  versions: BibleVersion[];
  book: number;
  books: BibleBook[];
  chapter: number;
  chapters: BibleChapter[];
  verse: number;
  verses: BibleVerse[];
}

export const initialState = {
  language: null,
  languages: [],
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
    case fromBible.SELECT_LANGUAGE: {
      const language = action.language;
      return {
        ...state,
        language: language.short
      };
    }
    case fromBible.SELECT_LANGUAGES: {
      const languages = action.languages;
      const language = state.language || languages[0].short
      return {
        ...state,
        language,
        languages
      };
    }
    case fromBible.SELECT_VERSION: {
      const version = action.version;
      return {
        ...state,
        version: version.short
      };
    }
    case fromBible.SELECT_VERSIONS: {
      const versions = action.versions;
      const version = versions[0].short
      return {
        ...state,
        version,
        versions
      };
    }
    case fromBible.SELECT_BOOK: {
      const book = action.book;
      return {
        ...state,
        book: book.number
      };
    }
    case fromBible.SELECT_BOOKS: {
      const books = action.books;
      const book = state.book || books[0].number
      return {
        ...state,
        book,
        books
      };
    }
    case fromBible.SELECT_CHAPTER: {
      const chapter = action.chapter;
      return {
        ...state,
        chapter: chapter.number
      };
    }
    case fromBible.SELECT_CHAPTERS: {
      const chapters = action.chapters
      var chapter = state.chapter
      if (state.chapter && chapters.length >= state.chapter) {
        chapter = state.chapter
      } else {
        chapter = chapters[0].number
      }
      return {
        ...state,
        chapter,
        chapters
      };
    }
    case fromBible.SELECT_VERSE: {
      const verse = action.verse;
      return {
        ...state,
        verse:verse.number
      };
    }
    case fromBible.SELECT_VERSES: {
      const verses = action.verses;
      const verse = state.verse || verses[0].number
      return {
        ...state,
        verse,
        verses
      };
    }
  }

  return state;
}

export const getBibleVersion = (state: BibleState) => {
  if (state.version) {
    return state.versions.filter(version => version.short == state.version)
  } else {
    return state.versions[0]
  }
};
export const getBibleBook = (state: BibleState) => {
  if (state.book) {
    return state.books.filter(book => book.number == state.book)
  } else {
    return state.books[0]
  }
};
export const getBibleVerse = (state: BibleState) => {
  if (state.verse) {
    return state.verses.filter(verse => verse.number == state.verse)
  } else {
    return state.verses[0]
  }
};
export const getBibleChapter = (state: BibleState) => {
  if (state.chapter) {
    return state.chapters.filter(chapter => chapter.number == state.chapter)
  } else {
    return state.chapters[0]
  }
};
export const getBibleSelection = (state: BibleState) => state;
