import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-web-subs-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public btnTitle = 'Login \\ Register';
  private isUserLoggedIn = false;
  public loggedInuser = null;

  constructor(private router:Router, private user:UserService) { 
    console.log("user = ", user);
    if (user.isUserLoggedIn) {
      this.isUserLoggedIn = true;
      this.loggedInuser = user.getUser();
    }

  }

  ngOnInit() {
  }

}
