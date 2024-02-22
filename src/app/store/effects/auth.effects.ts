import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as authActions from '../actions/auth.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.login),
      tap(action => {
        // Perform any side effects like API calls or storing data
        console.log('User logged in:', action.email);
      })
    ),
    { dispatch: false } // This effect does not dispatch any new actions
  );

  constructor(private actions$: Actions) {}
}
