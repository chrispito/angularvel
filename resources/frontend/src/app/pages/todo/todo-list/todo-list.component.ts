import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { of as observableOf } from 'rxjs/observable/of';
import { map } from 'rxjs/operators/map';

import { ITodo } from '../../../models/interfaces/ITodo';
import { AbstractControl } from '@angular/forms/src/model';
import * as fromStore from '../../../stores/appStore';
import * as fromReducers from '../../../reducers';
import { ADD_TODO } from '../../../actions/todoActions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todosForm: FormGroup;
  private todosFormSubmitAttempt: boolean;
  priorities = [
    {value: 'low', viewValue: 'Low'},
    {value: 'medium', viewValue: 'Medium'},
    {value: 'high', viewValue: 'High'}
  ];
  todoList: {};
  reducers = {
    todos: fromReducers.reducer
  };
  store = new fromStore.Store(this.reducers);
  

  model: ITodo = {
    id: 0,
    description: "",
    responsible: "",
    priority: "low",
    isCompleted: false 
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.store.subscribe(state => {
      console.log('STATE:::', state);
      this.todoList = state.todos.data;
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
    ;
  }

  obSubmit() {
    if (this.todosForm.valid) {
      this.store.dispatch({
        type: ADD_TODO,
        payload: this.todosForm.value
      });
      this.resetFrom(this.todosForm)
    }
    

    this.todosFormSubmitAttempt = true; 
  }

  resetFrom(formGroup: FormGroup) {
    formGroup.reset()
      formGroup.markAsPristine()
      let control: AbstractControl = null;
      Object.keys(formGroup.controls).forEach((name) => {
        control = formGroup.controls[name];
        control.setErrors(null);
      });
  }

  toggleTodo(todo) {

  }

  removeTodo(todo) {

  }

}
