import { AuthState } from '../reducers/auth.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuth = createSelector(
    selectAuthState,
  (state: AuthState) => state
);
