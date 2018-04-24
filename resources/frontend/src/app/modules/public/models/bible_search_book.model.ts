import { IBibleSearchBook } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class BibleSearchBook implements IBibleSearchBook {
  name?: string;
}
