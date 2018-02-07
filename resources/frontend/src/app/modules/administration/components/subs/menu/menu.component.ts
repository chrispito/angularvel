import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../models/user.model';

import * as fromStore from '../../../store';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private isUserLoggedIn = false;
  public loggedInuser = null;
  user$: Observable<User>;
  isLoggedIn$: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<fromStore.WebAdminState>
  ) {
    this.user$ = this.store.select<any>(fromStore.getUser);
    this.store.dispatch(new fromStore.LoadUser());
    this.isLoggedIn$ = this.store.select<any>(fromStore.getLoginLoaded);
    this.isLoggedIn$.subscribe({
      next: event => (!event ? this.router.navigate(['/admin/login']) : null)
    });
  }

  ngOnInit() {}

  logout(event) {
    this.store.dispatch(new fromStore.UserLogout());
  }
}
