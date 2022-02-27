import { createReducer, on } from '@ngrx/store';
import { TasksState } from './types';
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


const initialState: TasksState = {
  tasks: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  changeLoading: false,
  changeError: null,
  deleteLoading: false,
  deleteError: null,
};

export const tasksReducer = createReducer(
  initialState,
  on(fetchTasksRequest, state => ({...state, fetchLoading: true})),
  on(fetchTasksSuccess, (state, {tasks}) => ({
    ...state,
    fetchLoading: false,
    tasks
  })),
  on(fetchTasksFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),

  on(createTaskRequest, state => ({...state, createLoading: true})),
  on(createTaskSuccess, state => ({...state, createLoading: false})),
  on(createTaskFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  })),

  on(changeTaskRequest, state => ({...state, changeLoading: true})),
  on(changeTaskSuccess, state => ({...state, changeLoading: false})),
  on(changeTaskFailure, (state, {error}) => ({
    ...state,
    changeLoading: false,
    changeError: error,
  })),

  on(deleteTaskRequest, state => ({...state, deleteLoading: true})),
  on(deleteTaskSuccess, state => ({...state, deleteLoading: false})),
  on(deleteTaskFailure, (state, {error}) => ({
    ...state,
    deleteLoading: false,
    deleteError: error,
  })),

);
