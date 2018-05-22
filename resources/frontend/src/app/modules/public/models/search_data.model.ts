import { ISearchData } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchData implements ISearchData {
  version?: string;
  book?: string;
  chapter?: string;
  verse?: string;
}
