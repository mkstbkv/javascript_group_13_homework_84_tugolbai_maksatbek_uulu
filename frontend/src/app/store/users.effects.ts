import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import {
  createUserFailure,
  createUserRequest,
  createUserSuccess,
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess
} from './users.actions';

@Injectable()

export class UsersEffects {
  fetchUsers = createEffect(() => this.actions.pipe(
    ofType(fetchUsersRequest),
    mergeMap(() => this.usersService.getUsers().pipe(
      map(users => fetchUsersSuccess({users})),
      catchError(() => of(fetchUsersFailure({
        error: 'Something went wrong'
      })))
    ))
  ));

  createUser = createEffect(() => this.actions.pipe(
    ofType(createUserRequest),
    mergeMap(({userData}) => this.usersService.createUser(userData).pipe(
      map(() => createUserSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createUserFailure({error: 'Wrong data'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private usersService: UsersService,
    private router: Router
  ) {}
}
