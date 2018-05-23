import { IBibleChapter } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class BibleChapter implements IBibleChapter {
  number?: number
  book_number?: number
}
