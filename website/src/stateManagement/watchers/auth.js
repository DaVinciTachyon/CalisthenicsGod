import { takeLeading, call, put } from 'redux-saga/effects';
import { postLogIn, postRegister } from '../requests/auth';
import { logIn, logOut, register } from '../reducers/auth';

export default function* authWatcher() {
  yield takeLeading(logIn.type, handleLogIn);
  yield takeLeading(logOut.type, handleLogOut);
  yield takeLeading(register.type, handleRegister);
}

function* handleRegister({ payload }) {
  try {
    yield call(postRegister, payload);
    yield put(register());
    window.location = '/login';
  } catch (err) {
    console.error(err.response);
  }
}

function* handleLogIn({ payload }) {
  try {
    const response = yield call(postLogIn, payload);
    const { data } = response;
    yield put(logIn(data));
    window.location = '/';
  } catch (err) {
    console.error(err.response);
  }
}

function* handleLogOut({ payload }) {
  yield put(logOut());
  window.location.reload();
}
