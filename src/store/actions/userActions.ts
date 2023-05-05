export const saveUserId = (userId: string) => {
  return {
    type: 'SAVE_USER_ID',
    payload: {
      userId,
    },
  };
};

export const saveUserName = (userName: string) => {
  return {
    type: 'SAVE_USER_NAME',
    payload: {
      userName,
    },
  };
};
