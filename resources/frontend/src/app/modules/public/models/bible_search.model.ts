import { IBibleSearch } from './interfaces';
import { Injectable } from '@angular/core';
import { BibleSearchVersion } from './index';

@Injectable()
export class BibleSearch implements IBibleSearch {
  versions?: BibleSearchVersion[];
}
