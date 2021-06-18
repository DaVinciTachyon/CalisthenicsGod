import { takeLeading, call, put, select } from 'redux-saga/effects';
import {
  addIngredient,
  changeAvailability,
  setIngredients,
  getIngredients,
  patchIngredient,
} from '../reducers/ingredients';
import { post, get, deleteReq, patch } from '../requests/ingredients';

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
  } catch (err) {
    console.error(err.response);
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
