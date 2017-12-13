import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  public isUserLoggedIn;
  private user;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(user) {
    console.log(" USer = ", user)
    this.isUserLoggedIn = true;
    this.user = user;
  }

  getUser() {
    return this.user;
  }


}
