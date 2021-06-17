import { takeLeading, call, put } from 'redux-saga/effects';
import {
  addIngredient,
  modifyIngredient,
  removeIngredient,
  setPresetMeals,
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

export default function* presetMealWatcher() {
  yield takeLeading(addIngredient.type, handlePostPresetMealIngredient);
  yield takeLeading(modifyIngredient.type, handlePatchPresetMealIngredient);
  yield takeLeading(removeIngredient.type, handleDeletePresetMealIngredient);
  yield takeLeading(setPresetMeals.type, handleGetPresetMeals);
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
    console.error(err.response);
  }
}

function* handlePatchPresetMealIngredient({ payload }) {
  try {
    yield call(patchIngredient, payload);
    yield put(modifyIngredient(payload));
  } catch (err) {
    console.error(err.response);
  }
}

function* handleDeletePresetMealIngredient({ payload }) {
  try {
    yield call(deleteIngredient, payload);
    yield put(removeIngredient(payload));
  } catch (err) {
    console.error(err.response);
  }
}

function* handleGetPresetMeals({ payload }) {
  try {
    const response = yield call(get);
    const { data } = response;
    yield put(setPresetMeals(data.meals));
  } catch (err) {
    console.error(err.response);
  }
}

function* handlePostPresetMeal({ payload }) {
  try {
    const response = yield call(post, payload);
    const { data } = response;
    yield put(addPresetMeal({ ...payload, _id: data._id }));
  } catch (err) {
    console.error(err.response);
  }
}

function* handleDeletePresetMeal({ payload }) {
  try {
    yield call(deleteReq, payload);
    yield put(deletePresetMeal(payload));
  } catch (err) {
    console.error(err.response);
  }
}

function* handlePatchPresetMeal({ payload }) {
  try {
    yield call(patch, payload);
    yield put(modifyPresetMeal(payload));
  } catch (err) {
    console.error(err.response);
  }
}
