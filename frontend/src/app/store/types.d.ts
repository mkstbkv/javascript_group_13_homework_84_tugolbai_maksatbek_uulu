import { User } from '../models/user.model';
import { Task } from '../models/task.model';

export type UsersState = {
  users: User[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type TasksState = {
  tasks: Task[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  changeLoading: boolean,
  changeError: null | string,
  deleteLoading: boolean,
  deleteError: null | string,
};

export type AppState = {
  users: UsersState,
  tasks: TasksState
}


