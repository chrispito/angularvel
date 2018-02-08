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
import { UserService } from '../../services/index';
import * as fromStore from '../../store';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  hideLogPass: boolean;
  user$: Observable<User>;

  private loginFormSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private user: UserService,
    public dialog: MatDialog,
    private store: Store<fromStore.WebAdminState>
  ) {
    this.user$ = this.store.select<any>(fromStore.getUser);
    this.user$.subscribe({
      next: (event: User) => ((event && event.type === 'admin') ? this.router.navigate(['/admin/dashboard']) : null)
    });
  }

  ngOnInit() {
    this.hideLogPass = true;
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
    return observableOf(
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
        (this.loginForm.get(field).untouched && this.loginFormSubmitAttempt)
    ).pipe(map(result => (result ? { invalid: true } : null)));
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

}
