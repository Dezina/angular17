import { createReducer, on } from '@ngrx/store';
import * as authActions from '../actions/auth.actions';

export interface AuthState {
    user: { email: string, password: string } | null;
}

export const initialAuthState: AuthState = {
    user: null,
};

export const authReducer = createReducer(
    initialAuthState,
    on(authActions.login, (state, { email, password }) => ({
        ...state,
        user: { email, password },
    })),
    on(authActions.logout, (state) => ({
        ...state,
        user: null,
    }))
);
