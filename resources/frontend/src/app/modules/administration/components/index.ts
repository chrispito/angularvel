import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './subs/menu/menu.component';
import { PagesComponent } from './pages/pages.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { FileManagerComponent } from './pages/file-manager/file-manager.component';

export const components: any[] = [
  DashboardComponent,
  UserManagerComponent,
  NotFoundComponent,
  LoginComponent,
  FileManagerComponent,
  MenuComponent,
  PagesComponent,
  AboutusComponent
];

export * from './dashboard/dashboard.component';
export * from './user-manager/user-manager.component';
export * from './not-found/not-found.component';
export * from './login/login.component';
export * from './subs/menu/menu.component';
export * from './pages/pages.component';
export * from './pages/file-manager/file-manager.component';
export * from './pages/aboutus/aboutus.component';
