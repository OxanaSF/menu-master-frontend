import { AuthActionTypes, LOGIN_REQUEST, LOGOUT_REQUEST } from '../types/authTypes';

export type AuthState = {
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        error: null,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
