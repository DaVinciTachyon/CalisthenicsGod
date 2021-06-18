import { takeLeading, call, put, select } from 'redux-saga/effects';
import {
  addIngredient,
  modifyIngredient,
  removeIngredient,
  setPresetMeals,
  getPresetMeals,
  deletePresetMeal,
  addPresetMeal,
  modifyPresetMeal,
} from '../reducers/presetMeals';
import {
  postIngredient,
  patchIngredient,
  deleteIngredient,
  get,
  deleteReq,
  post,
  patch,
} from '../requests/presetMeals';
import { success, error } from '../reducers/notification';

export default function* presetMealWatcher() {
  yield takeLeading(addIngredient.type, handlePostPresetMealIngredient);
  yield takeLeading(modifyIngredient.type, handlePatchPresetMealIngredient);
  yield takeLeading(removeIngredient.type, handleDeletePresetMealIngredient);
  yield takeLeading(getPresetMeals.type, handleGetPresetMeals);
  yield takeLeading(deletePresetMeal.type, handleDeletePresetMeal);
  yield takeLeading(addPresetMeal.type, handlePostPresetMeal);
  yield takeLeading(modifyPresetMeal.type, handlePatchPresetMeal);
}

function* handlePostPresetMealIngredient({ payload }) {
  try {
    const response = yield call(postIngredient, payload);
    const { data } = response;
    yield put(
      addIngredient({
        ...payload,
        ingredient: {
          _id: data.ingredient._id,
          ...payload.ingredient,
        },
      })
    );
  } catch (err) {
    error(err.response.data.error);
  }
}

function* handlePatchPresetMealIngredient({ payload }) {
  try {
    yield call(patchIngredient, payload);
    yield put(modifyIngredient(payload));
  } catch (err) {
    error(err.response.data.error);
  }
}

function* handleDeletePresetMealIngredient({ payload }) {
  try {
    yield call(deleteIngredient, payload);
    yield put(removeIngredient(payload));
  } catch (err) {
    error(err.response.data.error);
  }
}

function* handleGetPresetMeals({ payload }) {
  try {
    const presetMeals = yield select((state) => state.presetMeals);
    if (presetMeals.length === 0) {
      const response = yield call(get);
      const { data } = response;
      yield put(setPresetMeals(data.meals));
    }
  } catch (err) {
    error(err.response.data.error);
  }
}

function* handlePostPresetMeal({ payload }) {
  try {
    const response = yield call(post, payload);
    const { data } = response;
    yield put(addPresetMeal({ ...payload, _id: data._id }));
  } catch (err) {
    error(err.response.data.error);
  }
}

function* handleDeletePresetMeal({ payload }) {
  try {
    yield call(deleteReq, payload);
    yield put(deletePresetMeal(payload));
  } catch (err) {
    error(err.response.data.error);
  }
}

function* handlePatchPresetMeal({ payload }) {
  try {
    yield call(patch, payload);
    yield put(modifyPresetMeal(payload));
  } catch (err) {
    error(err.response.data.error);
  }
}
