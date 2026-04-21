import { takeLatest, call, put } from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  USER_LOGIN,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
} from '../action';

import { UserLogin } from '../api/auth';
import { ApiResponse } from '../../types/api.auth.types';

export function* userLoginAsync(action: any): Generator {
  try {
    yield put({ type: USER_LOGIN_REQUEST });

    const result = yield call(UserLogin, action.payload) as unknown as ApiResponse;

    if (result?.ok === true) {
      const token = result.token || result.data?.token || null;
      const payload = result.data || (token ? { token } : result);

      console.log('[SAGA] ✅ LOGIN SUCCESS');
      console.log('[SAGA] 🔑 token:', token);
      console.log('[SAGA] 📦 payload:', payload);

      // Persist for AppNav hydration
      yield call([AsyncStorage, 'setItem'], 'userToken', JSON.stringify(payload));

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
  } catch {}
}

export default function* authSaga(): Generator {
  yield takeLatest(USER_LOGIN, userLoginAsync);
  yield takeLatest(USER_LOGOUT, userLogoutAsync);
}
