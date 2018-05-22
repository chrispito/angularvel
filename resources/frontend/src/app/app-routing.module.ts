import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


const webRoutes = [
    { path: 'admin', loadChildren: './modules/administration/admin.module#AdminModule' },
    { path: '', loadChildren: './modules/public/public.module#PublicModule'},
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