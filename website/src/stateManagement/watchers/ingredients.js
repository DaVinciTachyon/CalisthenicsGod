import { takeLeading, call, put, select } from 'redux-saga/effects';
import {
  addIngredient,
  changeAvailability,
  setIngredients,
  getIngredients,
  patchIngredient,
} from '../reducers/ingredients';
import { post, get, deleteReq, patch } from '../requests/ingredients';
import { success, error } from '../reducers/notification';

export default function* ingredientWatcher() {
  yield takeLeading(addIngredient.type, handlePostIngredient);
  yield takeLeading(getIngredients.type, handleSetIngredients);
  yield takeLeading(changeAvailability.type, handleIngredientAvailability);
  yield takeLeading(patchIngredient.type, handlePatchIngredient);
}

function* handlePostIngredient({ payload }) {
  try {
    const response = yield call(post, payload);
    const { data } = response;
    yield put(addIngredient({ ...data }));
    success('Ingredient Added');
  } catch (err) {
    error(err.response.data.error);
  }
}

function* handleSetIngredients({ payload }) {
  try {
    const ingredients = yield select((state) => state.ingredients);
    if (ingredients.length === 0) {
      const response = yield call(get);
      const { data } = response;
      yield put(setIngredients(data.ingredients));
    }
  } catch (err) {
    error(err.response.data.error);
  }
}

function* handleIngredientAvailability({ payload }) {
  try {
    yield call(deleteReq, payload._id);
    yield put(changeAvailability({ ...payload }));
    success('Ingredient Availability Changed');
  } catch (err) {
    error(err.response.data.error);
  }
}

function* handlePatchIngredient({ payload }) {
  try {
    yield call(patch, payload);
    yield put(patchIngredient({ ...payload }));
    success('Ingredient Updated');
  } catch (err) {
    error(err.response.data.error);
  }
}
