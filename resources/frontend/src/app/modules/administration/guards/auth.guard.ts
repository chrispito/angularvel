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
    return this.store.select<any>(fromStore.getUser)
      .do((user: User) => {
        console.log('AuthGuard[getFromStoreOrAPI] user = ', user);
        if (!user || user.type !== 'admin') {
          this.store.dispatch(new fromStore.LoadUser());
          this.router.navigate(['/admin/login']);
        }
      });
  }

  canActivate(): Observable<boolean> {
    return this.getFromStoreOrAPI().switchMap(
      (data) => {
        console.log('AuthGuard[canActivate] data = ', data);
        return of(true);
      }
    ).catch(
      (error) => {
        console.log('AuthGuard[canActivate] error = ', error);
        return of(false);
      }
    );
  }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   // this.user$.subscribe({
  //   //   next: event => console.log('event = ', event)
  //   // });
  //   this.user$ = this.store.select<any>(fromStore.getUser).subscribe((user) => {
  //     console.log('AuthGuard[canActivate] user = ', user);
  //     if (user && user.type === 'admin') {
  //       return true;
  //     } else {
  //       this.router.navigate(['/admin/login'], {
  //         queryParams: {
  //           return: state.url
  //         }
  //       });
  //       return false;
  //     }
  //   });
  //   // if (this.user$) {
  //   //   return true;
  //   // } else {
  //   //   this.router.navigate(['/admin/login'], {
  //   //     queryParams: {
  //   //       return: state.url
  //   //     }
  //   //   });
  //     return false;
  //   // }
  // }
}
