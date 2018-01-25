import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule, MetaReducer } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


/**
 * Not for production
 */
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { storeFreeze } from 'ngrx-store-freeze'


/** 
 * Modules
*/
import { AppRoutingModule } from './app-routing.module';

/** 
 * Components
*/
import { AppComponent } from './app.component';


import { environment } from './../environments/environment';

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {metaReducers}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
