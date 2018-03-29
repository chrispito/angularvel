import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AuthGuard } from './guards/auth.guard';
import * as fromContainer from './containers';
import * as fromComponent from './components';

const adminRoutes = [
    { path: '', component: fromContainer.AdminComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: fromComponent.DashboardComponent },
      { path: 'aboutus', component: fromComponent.AboutusComponent },
      { path: 'file-manager', component: fromComponent.FileManagerComponent },
      { path: 'users', component: fromComponent.UserManagerComponent },
      { path: 'pages', component: fromComponent.PagesComponent },
    ]},
    { path: 'login', component: fromComponent.LoginComponent },
    { path: '**', component: fromComponent.NotFoundComponent },
];

@NgModule({
    imports: [
        NgbModule.forRoot(),
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
