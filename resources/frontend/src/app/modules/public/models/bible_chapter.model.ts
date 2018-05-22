import { IBibleChapter } from './interfaces';
import { Injectable } from '@angular/core';
import { BibleVerse } from './index';

@Injectable()
export class BibleChapter implements IBibleChapter {
  number?: number
  verses?: BibleVerse[]
}
