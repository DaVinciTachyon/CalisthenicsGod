import { call, put } from 'redux-saga/effects';
import { post, get, deleteReq, patch } from '../requests/ingredients';
import {
  addIngredient,
  setIngredients,
  changeAvailability,
  patchIngredient,
} from '../reducers/ingredients';

function* handlePostIngredient({ payload }) {
  try {
    const response = yield call(post, payload);
    const { data } = response;
    yield put(addIngredient({ ...payload, _id: data._id }));
  } catch (err) {
    console.error(err.response);
  }
}

function* handleSetIngredients({ payload }) {
  try {
    const response = yield call(get);
    const { data } = response;
    yield put(setIngredients({ ...data }));
  } catch (err) {
    console.error(err.response);
  }
}

function* handleIngredientAvailability({ payload }) {
  try {
    yield call(deleteReq, payload._id);
    yield put(changeAvailability({ ...payload }));
  } catch (err) {
    console.error(err.response);
  }
}

function* handlePatchIngredient({ payload }) {
  try {
    yield call(patch, payload);
    yield put(patchIngredient({ ...payload }));
  } catch (err) {
    console.error(err.response);
  }
}

export {
  handlePostIngredient,
  handleSetIngredients,
  handleIngredientAvailability,
  handlePatchIngredient,
};
