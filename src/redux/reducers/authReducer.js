import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
} from '../action';

const INITIAL_STATE = {
  user: null,
  isLoading: false,
  error: null,
};

export default function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, isLoading: true, error: null };

    case USER_LOGIN_SUCCESS:
      return { ...state, isLoading: false, user: action.payload, error: null };

    case USER_LOGIN_FAILURE:
      return { ...state, isLoading: false, user: null, error: action.error || 'Login failed' };

    case USER_LOGOUT:
      return { ...state, user: null, isLoading: false, error: null };

    default:
      return state;
  }
}