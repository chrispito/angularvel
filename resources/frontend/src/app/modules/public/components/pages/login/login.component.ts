import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';
import { MatDialog, MatDialogRef } from '@angular/material';

import _ from 'lodash';
import { UserService } from '../../../services/index';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  hideLogPass: boolean;
  hideRegPass1: boolean;
  hideRegPass2: boolean;
  isLoggedIn$: Observable<boolean>;
  isRegistered$: Observable<boolean>;

  private loginFormSubmitAttempt: boolean;
  private registerFormSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user: UserService,
    public dialog: MatDialog,
    private store: Store<fromStore.WebPublicState>
  ) {
    this.isLoggedIn$ = this.store.select<any>(fromStore.getLoginLoaded);
    this.isLoggedIn$.subscribe({
      next: event => (event ? this.router.navigate(['/web/home']) : null)
    });
    this.isRegistered$ = this.store.select<any>(fromStore.getRegistered);
    this.isRegistered$.subscribe({
      next: event => (event ? this.openDialog() : null)
    });
  }

  ngOnInit() {
    this.hideLogPass = true;
    this.hideRegPass1 = true;
    this.hideRegPass2 = true;
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

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(new fromStore.UserRegisterReset());
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
      this.store.dispatch(
        new fromStore.UserLogin({
          ...this.loginForm.value
        })
      );
    }
    this.loginFormSubmitAttempt = true;
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.store.dispatch(
        new fromStore.UserRegister({
          ...this.registerForm.value
        })
      );
    }
    this.registerFormSubmitAttempt = true;
  }
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: 'dialog-overview-dialog.html'
})
export class LoginDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private router: Router
  ) {}

  onButtonClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/web/home']);
  }
}
