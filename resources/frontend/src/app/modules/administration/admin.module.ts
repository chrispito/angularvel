import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { StoreModule } from "@ngrx/store";
import { reducers, effects } from "./store";

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminHttpInterceptor } from './services/admin-http-interceptor';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
    StoreModule.forFeature("products", reducers),
    EffectsModule.forFeature(effects),
    NgbModule.forRoot(),
  ],
  providers: [
    ...fromServices.services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AdminHttpInterceptor,
      multi: true
    },
    AuthGuard
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class AdminModule {}
