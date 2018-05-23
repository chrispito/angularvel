import { IBibleVerse } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class BibleVerse implements IBibleVerse {
  verse?: string
  number?: number
  book_number?: number
  chapter_number?: number
  key?: number
}
