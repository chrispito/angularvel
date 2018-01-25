import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const webRoutes = [
    { path: '', redirectTo: 'web', pathMatch: 'full' },
    { path: 'web', loadChildren: './modules/public/public.module#PublicModule'},
    { path: 'admin', loadChildren: './modules/administration/admin.module#AdminModule' },

    // { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(webRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }