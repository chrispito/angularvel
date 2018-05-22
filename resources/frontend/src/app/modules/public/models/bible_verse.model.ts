import { IBibleVerse } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class BibleVerse implements IBibleVerse {
  verse?: string
  verse_nr?: number
  chapter_nr?: number
  bbl_book_id?: number
}
