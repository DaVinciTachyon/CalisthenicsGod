import { call, put } from 'redux-saga/effects';
import {
  addIngredient,
  modifyIngredient,
  removeIngredient,
  setMeals,
  addPresetMeal,
} from '../reducers/meals';
import { deleteReq, get, patch, post, postPresetMeal } from '../requests/meals';

function* handlePostMealIngredient({ payload }) {
  try {
    const response = yield call(post, payload);
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
    const response = yield call(get);
    const { data } = response;
    yield put(setMeals(data.meals));
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

export {
  handleGetMeals,
  handleDeleteMealIngredient,
  handlePatchMealIngredient,
  handlePostMealIngredient,
  handlePostPresetMeal,
};
