import { Component, OnInit, Sanitizer } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

import { About, AboutSection } from '../../../models';
import * as fromStore from '../../../store';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  pageState$: Observable<About>;

  constructor(private store: Store<fromStore.WebPublicState>) {
    this.pageState$ = this.store.select<any>(fromStore.getAboutPage);
    this.store.dispatch(new fromStore.LoadAboutPage());
   }

  ngOnInit() {
  }

}
