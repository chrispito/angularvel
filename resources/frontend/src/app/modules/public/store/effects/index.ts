import { UserEffects } from './user.effects';
import { PagesEffects } from './pages.effects';
import { BibleSearchEffects } from './bible_search.effects';

export const effects: any[] = [UserEffects, PagesEffects, BibleSearchEffects];

export * from './user.effects';
export * from './pages.effects';
export * from './bible_search.effects';
