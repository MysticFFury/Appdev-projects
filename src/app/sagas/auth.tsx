import { takeLatest, call, put } from 'redux-saga/effects';
import AsyncStorage from '../../utils/storage';

import {
  USER_LOGIN,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
} from '../action';

import { UserLogin } from '../api/auth';
import { ApiResponse } from '../../types/api.auth.types';
import { showSuccess } from '../../components/AlertMsg';

export function* userLoginAsync(action: any): Generator {
  try {
    yield put({ type: USER_LOGIN_REQUEST });

    const result = yield call(UserLogin, action.payload) as unknown as ApiResponse;

    if (result?.ok === true) {
      const token = result.token || result.data?.token || null;
      const apiUser = result.data?.user ?? result.data;
      const payload = {
        token,
        user: apiUser,
        roles: apiUser?.roles ?? [],
      };

      console.log('[SAGA] ✅ LOGIN SUCCESS');

      yield call([AsyncStorage, 'setItem'], 'userToken', JSON.stringify(payload));

      showSuccess('Signed in successfully', `Welcome back, ${apiUser?.name || 'User'}!`);

      yield put({ type: USER_LOGIN_SUCCESS, payload });
      return;
    }

    const message = result?.error || 'Invalid credentials';
    yield put({ type: USER_LOGIN_FAILURE, error: message });
  } catch (error: any) {
    yield put({
      type: USER_LOGIN_FAILURE,
      error: error?.message || 'An unexpected error occurred',
    });
  }
}

export function* userLogoutAsync(): Generator {
  try {
    yield call([AsyncStorage, 'removeItem'], 'userToken');
    showSuccess('Signed out', 'You have been securely signed out.');
  } catch {}
}

export default function* authSaga(): Generator {
  yield takeLatest(USER_LOGIN, userLoginAsync);
  yield takeLatest(USER_LOGOUT, userLogoutAsync);
}
