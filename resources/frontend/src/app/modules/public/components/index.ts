/**
 * Pages Components
 */
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TodoComponent } from './pages/todo/todo.component';
import { TodoListComponent } from './pages/todo/todo-list/todo-list.component';
import { TodoOverviewComponent } from './pages/todo/todo-overview/todo-overview.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PizzaComponent } from './pages/pizza/pizza.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';

/**
 * Sub - Components
 */
import { FooterComponent } from './web-subs/footer/footer.component'
import { MenuComponent } from './web-subs/menu/menu.component'

export const components: any[] = [
    AboutUsComponent,
    ContactComponent,
    TodoComponent,
    TodoListComponent,
    TodoOverviewComponent,
    HomeComponent,
    NotFoundComponent,
    PizzaComponent,
    LoginComponent,
    ProfileComponent,

    FooterComponent,
    MenuComponent
  ];

export * from './pages/about-us/about-us.component';
export * from './pages/contact/contact.component';
export * from './pages/todo/todo.component';
export * from './pages/todo/todo-list/todo-list.component';
export * from './pages/todo/todo-overview/todo-overview.component';
export * from './pages/home/home.component';
export * from './pages/not-found/not-found.component';
export * from './pages/pizza/pizza.component';
export * from './pages/login/login.component';
export * from './pages/profile/profile.component';

export * from './web-subs/footer/footer.component';
export * from './web-subs/menu/menu.component';