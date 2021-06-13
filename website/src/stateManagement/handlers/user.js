import { call, put } from 'redux-saga/effects';
import { logIn, register, logOut } from '../reducers/user';
import { postLogIn, postRegister } from '../requests/user';

function* handleRegister({ payload }) {
  try {
    yield call(postRegister, payload);
    yield put(register());
  } catch (err) {
    console.error(err.response);
  }
}

function* handleLogIn({ payload }) {
  try {
    const response = yield call(postLogIn, payload);
    const { data } = response;
    yield put(logIn(data));
  } catch (err) {
    console.error(err.response);
  }
}

function* handleLogOut({ payload }) {
  yield put(logOut());
}

export { handleLogIn, handleRegister, handleLogOut };
