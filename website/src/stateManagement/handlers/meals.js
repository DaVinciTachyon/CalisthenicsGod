import { call, put } from 'redux-saga/effects';
import {
  addIngredient,
  modifyIngredient,
  removeIngredient,
  setMeals,
  addPresetMeal,
} from '../reducers/meals';
import { deleteReq, get, patch, post, postPresetMeal } from '../requests/meals';
import { handlePostIngredient } from './ingredients';

function* handlePostMealIngredient({ payload }) {
  try {
    let id = payload.ingredient.id;
    if (!id)
      id = yield* handlePostIngredient({
        payload: {
          name: payload.ingredient.name,
          macronutrients: payload.ingredient.macronutrients,
        },
      });
    const response = yield call(post, {
      _id: payload._id,
      ingredient: { id, weight: payload.ingredient.weight },
    });
    const { data } = response;
    yield put(
      addIngredient({
        _id: data._id,
        ingredient: {
          weight: payload.ingredient.weight,
          _id: data.ingredient._id,
          id,
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
