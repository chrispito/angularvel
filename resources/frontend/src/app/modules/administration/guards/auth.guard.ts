import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import * as fromStore from '../store';
import { Subscription } from 'rxjs/Subscription';
import { User } from '../models/user.model';

@Injectable()
export class AuthGuard implements CanActivate {

  user$: Subscription;

  constructor(
    private store: Store<fromStore.WebAdminState>,
    private router: Router
  ) {  }

  getFromStoreOrAPI(): Observable<any> {
    return this.store.select<any>(fromStore.getUser);
  }

  canActivate(): Observable<boolean> {
    return this.getFromStoreOrAPI().switchMap(
      (user: User) => {
        if (user && user.roles.find( role => role.name === 'Admin' )) {
          return of(true);
        } else {
          const jld_user_token = JSON.parse(localStorage.getItem('JLD_USER_ADMIN_TOKEN'));
          if (jld_user_token) {
            this.store.dispatch(new fromStore.LoadUser());
          }
          this.router.navigate(['/admin/login']);
          return of(false);
        }
      }
    ).catch(
      (error) => {
        console.log("Error: ", error)
        this.router.navigate(['/admin/login']);
        return of(false);
      }
    );
  }

}
