import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminComponent } from './admin.component';
import { UserManagerComponent } from './user-manager/user-manager.component';

import { AuthGuard } from './../guards/auth.guard';

const adminRoutes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
              path: '',
              children: [
                { path: 'users', component: UserManagerComponent },
              ]
            }
          ]
    },
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