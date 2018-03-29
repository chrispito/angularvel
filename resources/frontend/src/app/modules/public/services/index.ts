import { ApiService } from './api.service';
import { UserService } from './user.service';
import { PagesService } from './pages.service';
import { BibleSearchService } from './bible_search.service';

export const services: any[] = [ApiService, UserService, PagesService, BibleSearchService];

export * from './api.service';
export * from './user.service';
export * from './pages.service';
export * from './bible_search.service';
