import { call, put } from 'redux-saga/effects';
import { handlePostIngredient } from './ingredients';
import {
  addIngredient,
  removeIngredient,
  modifyIngredient,
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

function* handlePostPresetMealIngredient({ payload }) {
  try {
    let id = payload.ingredient.id;
    if (!id)
      id = yield* handlePostIngredient({
        payload: {
          name: payload.ingredient.name,
          macronutrients: payload.ingredient.macronutrients,
        },
      });
    const response = yield call(postIngredient, {
      _id: payload._id,
      ingredient: { id, weight: payload.ingredient.weight },
    });
    const { data } = response;
    yield put(
      addIngredient({
        ...payload,
        ingredient: { ...payload.ingredient, _id: data.ingredient._id, id },
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

export {
  handlePostPresetMealIngredient,
  handlePatchPresetMealIngredient,
  handleDeletePresetMealIngredient,
  handleGetPresetMeals,
  handleDeletePresetMeal,
  handlePostPresetMeal,
  handlePatchPresetMeal,
};
