import { takeLeading, call, put } from 'redux-saga/effects';
import {
  addIngredient,
  changeAvailability,
  setIngredients,
  patchIngredient,
} from '../reducers/ingredients';
import { post, get, deleteReq, patch } from '../requests/ingredients';

export default function* ingredientWatcher() {
  yield takeLeading(addIngredient.type, handlePostIngredient);
  yield takeLeading(setIngredients.type, handleSetIngredients);
  yield takeLeading(changeAvailability.type, handleIngredientAvailability);
  yield takeLeading(patchIngredient.type, handlePatchIngredient);
}

function* handlePostIngredient({ payload }) {
  try {
    const response = yield call(post, payload);
    const { data } = response;
    yield put(addIngredient({ ...data }));
  } catch (err) {
    console.error(err.response);
  }
}

function* handleSetIngredients({ payload }) {
  try {
    const response = yield call(get);
    const { data } = response;
    yield put(setIngredients(data.ingredients));
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
