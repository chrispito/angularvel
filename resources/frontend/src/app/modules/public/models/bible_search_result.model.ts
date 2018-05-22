import { IBibleSearchResult } from './interfaces'
import { Injectable } from '@angular/core'
import { BibleVersion, BibleBook, BibleChapter } from './index'

@Injectable()
export class BibleSearchResult implements IBibleSearchResult {
  versions?: BibleVersion[]
  books?: BibleBook[]
  chapters?: BibleChapter[]
  requestData?: any
}
