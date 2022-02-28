import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { User } from '../../models/user.model';
import { fetchUsersRequest } from '../../store/users.actions';
import { TaskData } from '../../models/task.model';
import { createTaskRequest } from '../../store/tasks.actions';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.sass']
})
export class NewTaskComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  users: Observable<User[]>
  loading: Observable<boolean>;
  error: Observable<string | null>;

  constructor(
    private store: Store<AppState>
  ) {
    this.loading = store.select(state => state.tasks.createLoading);
    this.error = store.select(state => state.tasks.createError);
    this.users = store.select(state => state.users.users);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchUsersRequest());
  }

  onSubmit() {
    const taskData: TaskData = this.form.value;
    this.store.dispatch(createTaskRequest({taskData: taskData}));
    console.log(taskData);
  }
}
