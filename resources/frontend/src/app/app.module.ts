import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, CustomSerializer} from './store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {faChevronLeft, faChevronRight} from '@fortawesome/fontawesome-free-solid';
import fontawesome from '@fortawesome/fontawesome';


/**
 * Not for production
 */
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';


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

fontawesome.library.add(faChevronLeft, faChevronRight);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppRoutingModule
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
