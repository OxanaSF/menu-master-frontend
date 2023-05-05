export interface UserState {
  userId: string;
  userName: string;
}

const initialState: UserState = {
  userId: '',
  userName: '',
}

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SAVE_USER_ID':
      return {
        ...state,
        userId: action.payload.userId,
      };
    case 'SAVE_USER_NAME':
      return {
        ...state,
        userName: action.payload.userName,
      };
    default:
      return state;
  }
};

export default userReducer;