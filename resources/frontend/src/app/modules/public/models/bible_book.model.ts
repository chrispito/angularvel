import { IBibleBook } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class BibleBook implements IBibleBook {
  name?: string;
}
