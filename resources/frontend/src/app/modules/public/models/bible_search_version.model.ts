import { IBibleSearchVersion } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class BibleSearchVersion implements IBibleSearchVersion {
  name?: string;
  short?: string;
}
