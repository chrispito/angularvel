import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import * as fromContainer from './containers';
import * as fromComponent from './components';

const webRoutes = [
    { path: '', component: fromContainer.WebComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: fromComponent.HomeComponent },
        { path: 'login', component: fromComponent.LoginComponent },
        { path: 'aboutus', component: fromComponent.AboutUsComponent },
        { path: 'contact', component: fromComponent.ContactComponent },
        { path: 'profile', component: fromComponent.ProfileComponent },
    ] },

    { path: '**', component: fromComponent.NotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forChild(webRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PublicRoutingModule { }
