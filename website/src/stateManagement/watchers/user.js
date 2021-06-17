import { takeLeading, call, put } from 'redux-saga/effects';
import {
  setUserInfo,
  modifyUserInfo,
  setNutritionInfo,
  modifyNutritionInfo,
} from '../reducers/user';
import {
  get,
  patch,
  patchNutritionInfo,
  getNutritionInfo,
} from '../requests/user';

export default function* userWatcher() {
  yield takeLeading(setUserInfo.type, handleGetUser);
  yield takeLeading(modifyUserInfo.type, handlePatchUser);
  yield takeLeading(setNutritionInfo.type, handleGetNutritionInfo);
  yield takeLeading(modifyNutritionInfo.type, handlePatchNutritionInfo);
}

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

function* handleGetNutritionInfo({ payload }) {
  try {
    const response = yield call(getNutritionInfo);
    const { data } = response;
    yield put(setNutritionInfo(data));
  } catch (err) {
    console.error(err.response);
  }
}

function* handlePatchNutritionInfo({ payload }) {
  try {
    yield call(patchNutritionInfo, payload);
    yield put(modifyNutritionInfo(payload));
  } catch (err) {
    console.error(err.response);
  }
}
