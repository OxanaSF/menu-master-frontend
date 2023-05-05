import { AuthActionTypes, LOGIN_REQUEST, LOGOUT_REQUEST } from '../types/authTypes';

export const loginRequest = (): AuthActionTypes => ({
  type: LOGIN_REQUEST,
});

export const logoutRequest = (): AuthActionTypes => ({
  type: LOGOUT_REQUEST,
});
