import { takeLeading, call, put, select } from 'redux-saga/effects';
import {
  addIngredient,
  modifyIngredient,
  removeIngredient,
  setMeals,
  getMeals,
  addPresetMeal,
} from '../reducers/meals';
import { deleteReq, get, patch, post, postPresetMeal } from '../requests/meals';

export default function* mealWatcher() {
  yield takeLeading(getMeals.type, handleGetMeals);
  yield takeLeading(removeIngredient.type, handleDeleteMealIngredient);
  yield takeLeading(modifyIngredient.type, handlePatchMealIngredient);
  yield takeLeading(addIngredient.type, handlePostMealIngredient);
  yield takeLeading(addPresetMeal.type, handlePostPresetMeal);
}

function* handlePostMealIngredient({ payload }) {
  try {
    const response = yield call(post, payload);
    const { data } = response;
    yield put(
      addIngredient({
        ...payload,
        _id: data._id,
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

function* handlePostPresetMeal({ payload }) {
  try {
    const response = yield call(postPresetMeal, payload);
    const { data } = response;
    yield put(addPresetMeal(data));
  } catch (err) {
    console.error(err.response);
  }
}

function* handleGetMeals({ payload }) {
  try {
    const meals = yield select((state) => state.meals);
    if (meals.length === 0) {
      const response = yield call(get);
      const { data } = response;
      yield put(setMeals(data.meals));
    }
  } catch (err) {
    console.error(err.response);
  }
}

function* handleDeleteMealIngredient({ payload }) {
  try {
    yield call(deleteReq, payload);
    yield put(removeIngredient(payload));
  } catch (err) {
    console.error(err.response);
  }
}

function* handlePatchMealIngredient({ payload }) {
  try {
    yield call(patch, payload);
    yield put(modifyIngredient(payload));
  } catch (err) {
    console.error(err.response);
  }
}
