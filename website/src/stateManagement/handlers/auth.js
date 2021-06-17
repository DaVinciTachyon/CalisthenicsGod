import { call, put } from 'redux-saga/effects';
import { logIn, register, logOut } from '../reducers/auth';
import { postLogIn, postRegister } from '../requests/auth';

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

export { handleLogIn, handleRegister, handleLogOut };
