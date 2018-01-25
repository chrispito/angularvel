import { Component, OnInit } from '@angular/core';
import * as fromDtore from '../../../../../../customRedux/stores/appStore'

@Component({
  selector: 'app-todo-overview',
  templateUrl: './todo-overview.component.html',
  styleUrls: ['./todo-overview.component.css']
})
export class TodoOverviewComponent implements OnInit {
  todos = {};

  constructor() { 
    this.todos = fromDtore.Store;
  }

  ngOnInit() {
  }

  clearTodos() {
    console.log('Clear!!')
  }
}
