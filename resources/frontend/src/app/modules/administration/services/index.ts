import { ApiService } from './api.service';
import { UserService } from './user.service';
import { PagesService } from './pages.service';

export const services: any[] = [ApiService, UserService, PagesService];

export * from './api.service';
export * from './user.service';
export * from './pages.service';
