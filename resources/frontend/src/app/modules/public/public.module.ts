import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PublicRoutingModule } from './public-routing.module';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';

import { MaterialModule } from './material.module';
import { AuthGuard } from './guards/auth.guard';
import { PublicHttpInterceptor } from './services/public-http-interceptor';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    PublicRoutingModule,
    NgbModule.forRoot(),
    StoreModule.forFeature('webPublic', reducers),
    EffectsModule.forFeature(effects),
    HttpModule,
    HttpClientModule
  ],
  providers: [
    ...fromServices.services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PublicHttpInterceptor,
      multi: true
    },
    AuthGuard
  ],
  entryComponents: [fromComponents.LoginDialogComponent],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class PublicModule {}
