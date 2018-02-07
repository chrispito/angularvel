import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { About } from '../../../models/about_page.model';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  pageDatas$: Observable<About>;

  constructor(private store: Store<fromStore.WebAdminState>) {
    this.pageDatas$ = this.store.select<any>(fromStore.getAboutPage);
    this.store.dispatch(new fromStore.LoadAboutPage());
  }

  ngOnInit() {
  }

}
