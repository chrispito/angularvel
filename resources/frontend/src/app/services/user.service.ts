import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  public isUserLoggedIn;
  private userToken;
  private user;

  constructor() {
    this.isUserLoggedIn = false;
  }

  // setUserToken(userToken) {
  //   console.log("Set userToken = ", userToken)
  //   this.userToken = userToken;
  // }

  getUserToken() {
    return this.userToken;
  }

  setUserLoggedIn(userData) {
    console.log(" UserData = ", userData)
    this.isUserLoggedIn = true;
    this.user = userData.user;
    this.userToken = userData.token;
  }

  getUser() {
    return this.user;
  }


}
