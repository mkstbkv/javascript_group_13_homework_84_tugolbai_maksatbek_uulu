import { createReducer, on } from '@ngrx/store';
import {
  createUserFailure,
  createUserRequest,
  createUserSuccess,
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess
} from './users.actions';
import { UsersState } from './types';

const initialState: UsersState = {
  users: [],
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
};

export const usersReducer = createReducer(
  initialState,
  on(fetchUsersRequest, state => ({...state, fetchLoading: true})),
  on(fetchUsersSuccess, (state, {users}) => ({
    ...state,
    fetchLoading: false,
    users
  })),
  on(fetchUsersFailure, (state, {error}) => ({
    ...state,
    fetchLoading: false,
    fetchError: error
  })),
  on(createUserRequest, state => ({...state, createLoading: true})),
  on(createUserSuccess, state => ({...state, createLoading: false})),
  on(createUserFailure, (state, {error}) => ({
    ...state,
    createLoading: false,
    createError: error,
  }))
);
