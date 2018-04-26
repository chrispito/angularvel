import { IBibleSearch } from './interfaces';
import { Injectable } from '@angular/core';
import { BibleVersion, BibleBook, BibleChapter } from './index';

@Injectable()
export class BibleSearch implements IBibleSearch {
  versions?: BibleVersion[];
  books?: BibleBook[];
  chapters?: BibleChapter[];
}
