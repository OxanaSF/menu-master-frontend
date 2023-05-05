import { CombinedState } from 'redux';
import { UserState } from '../reducers/userReducer';

export const selectUserId = (state: CombinedState<{ user: UserState }>): string => {
  return state.user.userId;
};

export const selectUserName = (state: CombinedState<{ user: UserState }>): string => {
  return state.user.userName;
};
