// Auth action types (instructor-style)
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_LOGOUT = 'USER_LOGOUT';

// Action creators
export const userLogin = (credentials) => ({
  type: USER_LOGIN,
  payload: credentials, // Expected: { username: "email@domain.com", password }
});

export const userLoginRequest = () => ({ type: USER_LOGIN_REQUEST });
export const userLoginSuccess = (payload) => ({ type: USER_LOGIN_SUCCESS, payload });
export const userLoginFailure = (error) => ({ type: USER_LOGIN_FAILURE, error });

export const userLogout = () => ({ type: USER_LOGOUT });