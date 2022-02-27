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
        return response.map(albumData => {
          return new Task(
            albumData._id,
            albumData.user,
            albumData.title,
            albumData.status,
          );
        });
      })
    );
  }

  createTask(taskData: TaskData) {
    const formData = new FormData();

    Object.keys(taskData).forEach(key => {
      if (taskData[key] !== null) {
        formData.append(key, taskData[key]);
      }
    });

    return this.http.post(environment.apiUrl + '/tasks', formData);
  }

  changeTask(id: string, taskData: TaskData) {
    return this.http.post(environment.apiUrl + '/tasks/' + id, taskData);
  }

  deleteTask(id: string) {
    return this.http.delete(environment.apiUrl + '/tasks/' + id);
  }
}
