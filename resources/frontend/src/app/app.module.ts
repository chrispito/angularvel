import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

/** 
 * Modules
*/
import { MaterialModule } from './material.module';

/** 
 * Components
*/
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { WebComponent } from './web/web.component';
import { MenuComponent } from './web-subs/menu/menu.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FooterComponent } from './web-subs/footer/footer.component';

/**
 * Services
 */
import { UserService } from './services/user.service';

/**
 * Routes
 */
// import appRoutes from './router';
var appRoutes = [
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'aboutus', component: AboutUsComponent},
  {path: 'contact', component: ContactComponent},

  {
      path: 'admin',
      canActivate: [AuthGuard],
      component: AdminComponent
  },

  {path: '**', component: NotFoundComponent},
];

/**
 * Guards
 */
import { AuthGuard } from './guards/auth.guard';
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    LoginComponent,
    AdminComponent,
    MenuComponent,
    FooterComponent,
    WebComponent,
    AboutUsComponent,
    ContactComponent,
    NotFoundComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    UserService,
    ApiService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
