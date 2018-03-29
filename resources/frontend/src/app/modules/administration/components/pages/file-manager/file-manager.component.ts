import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { About, AboutSection } from '../../../models';
import * as fromUtils from '../../../models/utils';
import * as fromStore from '../../../store';
import { IAbout } from '../../../models/interfaces/index';

declare var $:any

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponent implements OnInit {

  pageForm: FormGroup
  iframUrl: string = "http://localhost:8000/jld-filemanager"

  constructor(
    private fb: FormBuilder,
    private store: Store<fromStore.WebAdminState>
  ) {
    
  }
  
  ngOnInit() {
  }

}
