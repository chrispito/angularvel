import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of as observableOf } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';

import { ITodo } from '../../../../models/interfaces/ITodo';
import { AbstractControl } from '@angular/forms/src/model';
import * as fromStore from '../../../../../../customRedux/stores/appStore';
import * as fromReducers from '../../../../../../customRedux/reducers';
import { ADD_TODO, REMOVE_TODO } from '../../../../../../customRedux/actions/todoActions';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todosForm: FormGroup;
  private todosFormSubmitAttempt: boolean;
  priorities = [
    {value: 'low', viewValue: 'Low'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'high', viewValue: 'High'}
  ];
  displayedColumns = ['position', 'description', 'responsible', 'priority', 'action'];
  todoList = new MatTableDataSource();
  reducers = {
    todos: fromReducers.reducer
  };
  store = new fromStore.Store(this.reducers);

  model: ITodo = {
    id: 0,
    description: '',
    responsible: '',
    priority: 'low',
    isCompleted: false
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.store.subscribe(state => {
      console.log('STATE:::', state);
      this.todoList.data = state.todos.data;
    });
    this.todosForm = this.fb.group({
      description: [null, Validators.required],
      responsible: [null, Validators.required],
      priority: [null, Validators.required]
    });
  }

  isTodosFieldInvalid(field: string) {
    return observableOf((
      (!this.todosForm.get(field).valid && this.todosForm.get(field).touched) ||
      (this.todosForm.get(field).untouched && this.todosFormSubmitAttempt)
    )).pipe(
      map(result => result ? { invalid: true } : null)
    );
  }

  obSubmit() {
    if (this.todosForm.valid) {
      const payload = {...this.todosForm.value};
      let maxIdTodo;
      if (this.todoList.data.length !== 0) {
        maxIdTodo = this.todoList.data.reduce( (a: ITodo, b: ITodo): ITodo => a.id > b.id ? a : b );
        payload.id = maxIdTodo.id + 1;
      } else {
        payload.id = 1;
      }
      this.store.dispatch({
        type: ADD_TODO,
        payload
      });
      this.resetFrom(this.todosForm);
    }

    this.todosFormSubmitAttempt = true;
  }

  resetFrom(formGroup: FormGroup) {
    formGroup.reset();
      formGroup.markAsPristine();
      let control: AbstractControl = null;
      Object.keys(formGroup.controls).forEach((name) => {
        control = formGroup.controls[name];
        control.setErrors(null);
      });
  }

  toggleTodo(todo) {

  }

  removeTodo(todo) {
    this.store.dispatch({
      type: REMOVE_TODO,
      payload: todo
    });
  }

}
