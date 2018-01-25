import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

import { of as observableOf } from "rxjs/observable/of";
import { map } from "rxjs/operators/map";

import _ from "lodash";
import { UserService } from "../../../services/index";
import * as fromStore from "../../../store";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;

  private loginFormSubmitAttempt: boolean;
  private registerFormSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user: UserService,
    private store: Store<fromStore.WebPublicState>
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required]
    });
    this.registerForm = this.fb.group({
      lastname: ["", Validators.required],
      firstname: ["", Validators.required],
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
      password2: [null, Validators.required]
    });
  }

  isLoginFieldInvalid(field: string) {
    return observableOf(
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
        (this.loginForm.get(field).untouched && this.loginFormSubmitAttempt)
    ).pipe(map(result => (result ? { invalid: true } : null)));
  }

  isRegisterFieldInvalid(field: string) {
    return (
      (!this.registerForm.get(field).valid &&
        this.registerForm.get(field).touched) ||
      (this.registerForm.get(field).untouched && this.registerFormSubmitAttempt)
    );
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.store
      .dispatch(new fromStore.UserLogin({
        ...this.loginForm.value,
        onCompleteActions: [this.router.navigate(['/web/home'])]
      }));
    }
    this.loginFormSubmitAttempt = true;
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.store.dispatch(new fromStore.UserRegister({
        ...this.registerForm.value,
        onCompleteActions: [this.router.navigate(['/web/home'])]
      }));
    }
    this.registerFormSubmitAttempt = true;
  }
}
