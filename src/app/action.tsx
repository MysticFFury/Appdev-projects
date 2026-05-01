// 1. Define the Action Types
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGIN_RESET = 'USER_LOGIN_RESET';
export const USER_LOGOUT = 'USER_LOGOUT';

// 2. Create the Action Creators
export const userLogin = (credentials: any) => ({
  type: USER_LOGIN,
  payload: credentials,
});

export const loginRequest = (credentials: any) => ({
  type: USER_LOGIN_REQUEST,
  payload: credentials, // { username, password }
});

export const loginSuccess = (token: any) => ({
  type: USER_LOGIN_SUCCESS,
  payload: token,
});

export const loginFailure = (error: string) => ({
  type: USER_LOGIN_FAILURE,
  payload: error,
});

export const resetLogin = () => ({
  type: USER_LOGIN_RESET,
});

export const logout = () => ({
  type: USER_LOGOUT,
});
