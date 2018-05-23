import { IBibleLanguage } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class BibleLanguage implements IBibleLanguage {
  name?: string;
  short?: string;
}
