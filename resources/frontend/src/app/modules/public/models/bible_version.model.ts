import { IBibleVersion } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class BibleVersion implements IBibleVersion {
  name?: string;
  short?: string;
}
