import { IBibleVersion } from './IBibleVersion'
import { IBibleBook } from './IBibleBook'
import { IBibleChapter } from './IBibleChapter'

export interface IBibleSearchResult {
  versions?: IBibleVersion[]
  book?: IBibleBook[]
  chapters?: IBibleChapter[]
  requestData?: any
}
