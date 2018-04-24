import { IBibleSearch } from './interfaces';
import { Injectable } from '@angular/core';
import { BibleSearchVersion, BibleSearchBook } from './index';

@Injectable()
export class BibleSearch implements IBibleSearch {
  versions?: BibleSearchVersion[];
  books?: BibleSearchBook[];
}
