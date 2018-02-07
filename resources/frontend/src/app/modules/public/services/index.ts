import { ApiService } from './api.service';
import { UserService } from './user.service';

export const services: any[] = [ApiService, UserService];

export * from './api.service';
export * from './user.service';
