import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { About, AboutSection } from '../../../models';
import * as fromUtils from '../../../models/utils';
import * as fromStore from '../../../store';
import { IAbout } from '../../../models/interfaces/index';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  pageState$: Observable<About>;
  pageData: About;
  pageForm: FormGroup;
  public editorOptions: Object = {
    toolbarButtons: [
      'undo', 'redo', '|', 'bold', 'italic',
      'underline', 'outdent',
      'indent', 'insertTable', 'html'
    ],
    events: {
      'froalaEditor.focus': function (e, editor) {
        console.log(editor.selection.get());
      }
    }
  };

  constructor(
    private fb: FormBuilder,
    private store: Store<fromStore.WebAdminState>
  ) {
    this.pageState$ = this.store.select<any>(fromStore.getAboutPage);
    this.pageState$.subscribe({
      next: page => this.pageData = page
    });
    this.store.dispatch(new fromStore.LoadAboutPage());
  }

  ngOnInit() {
    this.pageForm = this.fb.group({
      title: [null, Validators.required],
      subTitle: [null, Validators.required],
      descLabel: [null, Validators.required],
      description: [null, Validators.required],
      secLabel_0: [null, Validators.required],
      secLabel_1: [null, Validators.required],
      secLabel_2: [null, Validators.required],
      secLabel_3: [null, Validators.required],
      section_0: [null, Validators.required],
      section_1: [null, Validators.required],
      section_2: [null, Validators.required],
      section_3: [null, Validators.required],
    });
  }

  toArrayList(val) {
    return Array.from(val);
  }

  savePage() {
    const dataToSend: IAbout = fromUtils.getAbout(this.pageData);

    if (this.pageForm.value.descLabel !== null) {
      dataToSend.descLabel = this.pageForm.value.descLabel;
    }
    if (this.pageForm.value.description !== null) {
      dataToSend.description = this.pageForm.value.description;
    }
    if (this.pageForm.value.subTitle !== null) {
      dataToSend.subTitle = this.pageForm.value.subTitle;
    }
    if (this.pageForm.value.title !== null) {
      dataToSend.title = this.pageForm.value.title;
    }

    const sec_0 = new AboutSection();
    sec_0.id = dataToSend.sections[0].id;
    sec_0.text = this.pageForm.value.section_0 !== null ? this.pageForm.value.section_0 : dataToSend.sections[0].text;
    sec_0.label = this.pageForm.value.secLabel_0 !== null ? this.pageForm.value.secLabel_0 : dataToSend.sections[0].label;
    dataToSend.sections[0] = sec_0;

    const sec_1 = new AboutSection();
    sec_1.id = dataToSend.sections[1].id;
    sec_1.text = this.pageForm.value.section_1 !== null ? this.pageForm.value.section_1 : dataToSend.sections[1].text;
    sec_1.label = this.pageForm.value.secLabel_1 !== null ? this.pageForm.value.secLabel_1 : dataToSend.sections[1].label;
    dataToSend.sections[1] = sec_1;

    const sec_2 = new AboutSection();
    sec_2.id = dataToSend.sections[2].id;
    sec_2.text = this.pageForm.value.section_2 !== null ? this.pageForm.value.section_2 : dataToSend.sections[2].text;
    sec_2.label = this.pageForm.value.secLabel_2 !== null ? this.pageForm.value.secLabel_2 : dataToSend.sections[2].label;
    dataToSend.sections[2] = sec_2;

    const sec_3 = new AboutSection();
    sec_3.id = dataToSend.sections[3].id;
    sec_3.text = this.pageForm.value.section_3 !== null ? this.pageForm.value.section_3 : dataToSend.sections[3].text;
    sec_3.label = this.pageForm.value.secLabel_3 !== null ? this.pageForm.value.secLabel_3 : dataToSend.sections[3].label;
    dataToSend.sections[3] = sec_3;

    this.store.dispatch(
      new fromStore.UpdateAboutPage(dataToSend)
    );
  }

}
