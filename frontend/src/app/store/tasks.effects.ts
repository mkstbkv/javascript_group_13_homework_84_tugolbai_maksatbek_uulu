import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';

import {
  changeTaskFailure,
  changeTaskRequest, changeTaskSuccess,
  createTaskFailure,
  createTaskRequest,
  createTaskSuccess, deleteTaskFailure, deleteTaskRequest, deleteTaskSuccess,
  fetchTasksFailure,
  fetchTasksRequest,
  fetchTasksSuccess
} from './tasks.actions';

@Injectable()
export class TasksEffects {
  fetchTasks = createEffect(() => this.actions.pipe(
    ofType(fetchTasksRequest),
    mergeMap(() => this.tasksService.getTasks().pipe(
      map(tasks => fetchTasksSuccess({tasks})),
      catchError(() => of(fetchTasksFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createTask = createEffect(() => this.actions.pipe(
    ofType(createTaskRequest),
    mergeMap(({taskData}) => this.tasksService.createTask(taskData).pipe(
      map(() => createTaskSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createTaskFailure({error: 'Wrong data'})))
    ))
  ));

  changeTask = createEffect(() => this.actions.pipe(
    ofType(changeTaskRequest),
    mergeMap( (task) => this.tasksService.changeTask(task.id, task.taskData).pipe(
      map(() => changeTaskSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(changeTaskFailure({error: 'Wrong data'})))
    ))
  ));

  deleteTask = createEffect(() => this.actions.pipe(
    ofType(deleteTaskRequest),
    mergeMap((task) => this.tasksService.deleteTask(task.id).pipe(
      map(tasks => deleteTaskSuccess({tasks})),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(deleteTaskFailure({error: 'Wrong data'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private tasksService: TasksService,
    private router: Router,
  ) {}
}
