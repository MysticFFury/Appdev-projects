import { all } from 'redux-saga/effects';
import authSaga from './sagas/authSaga'; // Import the saga!

export default function* rootSaga() {

  yield all([

    authSaga(), // Add it to the list!

  ]);
 
}