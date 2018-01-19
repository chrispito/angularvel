import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { TodoComponent } from './pages/todo/todo.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';

const webRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'aboutus', component: AboutUsComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'todos', component: TodoComponent },

    {
        path: 'admin',
        canActivate: [AuthGuard],
        component: AdminComponent
    },

    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(webRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class WebRoutingModule { }