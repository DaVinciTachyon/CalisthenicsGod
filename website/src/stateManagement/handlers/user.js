import { call, put } from 'redux-saga/effects';
import { modifyUserInfo, setUserInfo } from '../reducers/user';
import { get, patch } from '../requests/user';

function* handleGetUser({ payload }) {
  try {
    const response = yield call(get);
    const { data } = response;
    yield put(setUserInfo(data));
  } catch (err) {
    console.error(err.response);
  }
}
function* handlePatchUser({ payload }) {
  try {
    yield call(patch, payload);
    yield put(modifyUserInfo(payload));
  } catch (err) {
    console.error(err.response);
  }
}

export { handleGetUser, handlePatchUser };
