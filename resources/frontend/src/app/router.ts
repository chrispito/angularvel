import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';

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

  export default appRoutes;