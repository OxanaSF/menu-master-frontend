import { User } from '../types/userTypes';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

interface LogoutRequestAction {
  type: typeof LOGOUT_REQUEST;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: {
    user: User;
  };
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: string;
}

interface LogoutSuccessAction {
  type: typeof LOGOUT_SUCCESS;
}

interface LogoutFailureAction {
  type: typeof LOGOUT_FAILURE;
  payload: string;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LogoutRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutSuccessAction
  | LogoutFailureAction;
