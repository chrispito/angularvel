import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './containers/products/products.component';
import { ProductItemComponent } from './containers/product-item/product-item.component';


const productsRoutes = [
    { path: '', component: ProductsComponent},
    { path: ':id', component: ProductItemComponent },
    { path: 'new', component: ProductItemComponent },

];

@NgModule({
    imports: [
        RouterModule.forChild(productsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProductsRoutingModule { }