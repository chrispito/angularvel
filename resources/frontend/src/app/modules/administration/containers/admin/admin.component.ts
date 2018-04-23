import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';

import * as fromStore from '../../store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {

  user$: Observable<User>;

  constructor(
    private store: Store<fromStore.WebAdminState>,
    private router: Router,
    private elRef: ElementRef
  ) {
    this.user$ = this.store.select<any>(fromStore.getUser);
    this.user$.subscribe({
      next: (user: User) => {
        if (!user || (user.roles.find( role => role.name === 'Admin' ) == undefined)) {
          this.router.navigate(['/admin/login'])
        }
      }
    });
   }

  ngOnInit() {
  }

}
