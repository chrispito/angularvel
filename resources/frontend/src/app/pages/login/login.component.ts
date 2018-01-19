import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { of as observableOf } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';

import _ from 'lodash';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private loginFormSubmitAttempt: boolean;
  registerForm: FormGroup;
  private registerFormSubmitAttempt: boolean;
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
    private fb: FormBuilder,
    private router:Router, 
    private user:UserService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required]
    });
    this.registerForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
      password2: [null, Validators.required]
    });
  }

  isLoginFieldInvalid(field: string) {
    return observableOf((
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.loginFormSubmitAttempt)
    )).pipe(
      map(result => result ? { invalid: true } : null)
    );
    ;
  }

  isRegisterFieldInvalid(field: string) {
    return (
      (!this.registerForm.get(field).valid && this.registerForm.get(field).touched) ||
      (this.registerForm.get(field).untouched && this.registerFormSubmitAttempt)
    );
  }

  loginUser() {

    if (this.loginForm.valid) {
      console.log("this.loginForm.value = ", this.loginForm.value)
      this.user.loginUser(this.loginForm.value);
      // this.authService.login(this.loginForm.value); // {7}
    }
    this.loginFormSubmitAttempt = true; 

    // event.preventDefault();
    // if (!_.isEmpty(event.target.elements) && event.target.elements.length === 4) {
    //   var email = event.target.elements[0].value;
    //   var password = event.target.elements[1].value;
    //   if (!this.regexp.test(email)) {
    //     this.hasEmailError = true;
    //   } else {
    //     this.user.loginUser({email, password});
    //     // this.user.setUserLoggedIn({email, password, username: 'Alli'});
    //     // this.router.navigate(['home']);
    //   }
      
    // } else {
    //   this.hasPwError = true;
    //   this.hasEmailError = true;
    // }

  }

  registerUser() {
    if (this.registerForm.valid) {
      console.log("this.registerForm.value = ", this.registerForm.value)
      this.user.registerUser(this.registerForm.value);
    }
    this.registerFormSubmitAttempt = true; 
    // var firstname = event.target.elements[0].value;
    // var lastname = event.target.elements[1].value;
    // var email = event.target.elements[2].value;
    // var password = event.target.elements[3].value;
    // var passwordR = event.target.elements[4].value;
    // var user = {
    //   email: email,
    //   password: password,
    //   name: firstname,
    // }
    // this.user.registerUser(user);
  }
}
