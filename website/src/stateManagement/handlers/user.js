import { call, put } from 'redux-saga/effects';
import {
  modifyNutritionInfo,
  modifyUserInfo,
  setNutritionInfo,
  setUserInfo,
} from '../reducers/user';
import {
  get,
  patch,
  patchNutritionInfo,
  getNutritionInfo,
} from '../requests/user';

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

export {
  handleGetUser,
  handlePatchUser,
  handleGetNutritionInfo,
  handlePatchNutritionInfo,
};
