import { CombinedState } from 'redux';
import { AuthState } from '../types/authTypes';
import { User } from '../types/userTypes';

export const selectIsLoggedIn = (state: CombinedState<{ auth: AuthState }>): boolean => {
  return state.auth.user !== null;
};

export const selectUser = (state: CombinedState<{ auth: AuthState }>): User | null => {
  return state.auth.user;
};

export const selectLoading = (state: CombinedState<{ auth: AuthState }>): boolean => {
  return state.auth.loading;
};

export const selectError = (state: CombinedState<{ auth: AuthState }>): string | null => {
  return state.auth.error;
};
