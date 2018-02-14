/**
 * Pages Components
 */
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {
  LoginComponent,
  LoginDialogComponent
} from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

/**
 * Sub - Components
 */
import { FooterComponent } from './web-subs/footer/footer.component';
import { MenuComponent } from './web-subs/menu/menu.component';

export const components: any[] = [
  AboutUsComponent,
  ContactComponent,
  HomeComponent,
  NotFoundComponent,
  LoginComponent,
  LoginDialogComponent,
  ProfileComponent,

  FooterComponent,
  MenuComponent
];

export * from './pages/about-us/about-us.component';
export * from './pages/contact/contact.component';
export * from './pages/home/home.component';
export * from './pages/not-found/not-found.component';
export * from './pages/login/login.component';
export * from './pages/profile/profile.component';

export * from './web-subs/footer/footer.component';
export * from './web-subs/menu/menu.component';
