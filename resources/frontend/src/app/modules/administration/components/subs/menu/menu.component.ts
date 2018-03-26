import { Component, OnInit, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { User } from '../../../models/user.model'

import * as fromStore from '../../../store'

@Component({
  selector: 'app-admin-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  navItems = [
    {name: 'Dashboard', route: './'},
    {name: 'About Us', route: './aboutus'},
    {name: 'Users', route: './users'}
  ]
  private isUserLoggedIn = false
  public loggedInuser = null
  user$: Observable<User>

  isLaunched = false
  fillerContent = Array(30)
  fixed = false
  coverHeader = false
  showHeader = false
  showFooter = false
  modeIndex = 0
  hasBackdrop: boolean
  get mode() { return ['side', 'over', 'push'][this.modeIndex] }
  get fixedTop() { return this.fixed && this.showHeader && !this.coverHeader ? 64 : 0 }
  get fixedBottom() { return this.fixed && this.showFooter && !this.coverHeader ? 64 : 0 }

  constructor(
    private router: Router,
    private store: Store<fromStore.WebAdminState>
  ) {
    this.user$ = this.store.select<any>(fromStore.getUser)
  }

  ngOnInit() {}

  logout(event) {
    this.store.dispatch(new fromStore.UserLogout())
  }
}
