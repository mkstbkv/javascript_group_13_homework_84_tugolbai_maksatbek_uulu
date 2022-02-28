import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { deleteTaskRequest, fetchTasksRequest } from '../../store/tasks.actions';
import { User } from '../../models/user.model';
import { fetchUsersRequest } from '../../store/users.actions';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {
  tasks: Observable<Task[]>
  users: Observable<User[]>
  loading: Observable<boolean>
  error: Observable<null | string>

  constructor(private store: Store<AppState>) {
    this.tasks = store.select(state => state.tasks.tasks);
    this.loading = store.select(state => state.tasks.fetchLoading);
    this.error = store.select(state => state.tasks.fetchError);
    this.users = store.select(state => state.users.users);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchTasksRequest());
    this.store.dispatch(fetchUsersRequest());
  }



  onDelete(id: string) {
    this.store.dispatch(deleteTaskRequest({id: id}));
    this.tasks =this.store.select(state => state.tasks.tasks);
  }
}
