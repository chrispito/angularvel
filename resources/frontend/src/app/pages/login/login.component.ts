import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import _ from 'lodash';
import { UserService } from '../../services/user.service';
// import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  public hasPwError = null;
  public hasEmailError = false;
  public formClassPW = {
    'hasError': this.hasPwError != null && this.hasPwError,
    'isSuccess':  this.hasPwError != null && !this.hasPwError,
  }
  public formClassEM = {
    'hasError': this.hasEmailError,
    'isSuccess': !this.hasEmailError,
  }
  constructor(
    private router:Router, 
    private user:UserService
  ) { }

  ngOnInit() {
  }

  loginUser(event) {
    event.preventDefault();
    if (!_.isEmpty(event.target.elements) && event.target.elements.length === 4) {
      var email = event.target.elements[0].value;
      var password = event.target.elements[1].value;
      if (!this.regexp.test(email)) {
        this.hasEmailError = true;
      } else {
        this.user.loginUser({email, password});
        // this.user.setUserLoggedIn({email, password, username: 'Alli'});
        // this.router.navigate(['home']);
      }
      
    } else {
      this.hasPwError = true;
      this.hasEmailError = true;
    }

  }

  registerUser(event) {
    var firstname = event.target.elements[0].value;
    var lastname = event.target.elements[1].value;
    var email = event.target.elements[2].value;
    var password = event.target.elements[3].value;
    var passwordR = event.target.elements[4].value;
    var user = {
      email: email,
      password: password,
      name: firstname,
    }
    this.user.registerUser(user);
  }
}
