import { createAction, props } from '@ngrx/store';
import { User, UserData } from '../models/user.model';

export const fetchUsersRequest = createAction('[Users] Fetch Request');

export const fetchUsersSuccess = createAction(
  '[Users] Fetch Success',
  props<{users: User[]}>()
);

export const fetchUsersFailure = createAction(
  '[Users] Fetch Failure',
  props<{error: string}>()
);

export const createUserRequest = createAction(
  '[Users] Create Request',
  props<{userData: UserData}>()
);

export const createUserSuccess = createAction(
  '[Users] Create Success'
);

export const createUserFailure = createAction(
  '[Users] Create Failure',
  props<{error: string}>()
);
