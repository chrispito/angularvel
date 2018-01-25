import { Component, OnInit, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { User } from "../../../models/user.model";

import * as fromStore from "../../../store";

@Component({
  selector: "app-web-subs-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  public btnTitle = "Login \\ Register";
  private isUserLoggedIn = false;
  public loggedInuser = null;
  user$: Observable<User>;

  constructor(
    private router: Router,
    private store: Store<fromStore.WebPublicState>
  ) {
    this.user$ = this.store.select<any>(fromStore.getUser);
    this.store.dispatch(new fromStore.LoadUser());
  }

  ngOnInit() {}

  logout(event) {
    this.store.dispatch(new fromStore.UserLogout());
  }
}
