import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiTaskData, Task, TaskData } from '../models/task.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<ApiTaskData[]>(environment.apiUrl + '/tasks').pipe(
      map(response => {
        return response.map(taskData => {
          return new Task(
            taskData._id,
            taskData.user,
            taskData.title,
            taskData.status,
          );
        });
      })
    );
  }

  createTask(taskData: TaskData) {
    return this.http.post(environment.apiUrl + '/tasks', taskData);
  }

  changeTask(id: string, taskData: any) {
    return this.http.put(environment.apiUrl + '/tasks/' + id, taskData);
  }

  deleteTask(id: string) {
    return this.http.delete<ApiTaskData[]>(environment.apiUrl + '/tasks/' + id).pipe(
      map(response => {
        return response.map(taskData => {
          return new Task(
            taskData._id,
            taskData.user,
            taskData.title,
            taskData.status,
          );
        });
      })
    );
  }
}
