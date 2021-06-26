import { takeLeading, call, put, select } from 'redux-saga/effects'
import {
  addIngredient,
  modifyIngredient,
  removeIngredient,
  removeMeal,
  setMeals,
  getMeals,
  addPresetMeal,
} from '../reducers/meals'
import {
  deleteReq,
  get,
  postIngredient,
  patchIngredient,
  deleteIngredient,
  postPresetMeal,
} from '../requests/meals'
import { success, error } from '../reducers/notification'

export default function* mealWatcher() {
  yield takeLeading(getMeals.type, handleGetMeals)
  yield takeLeading(removeMeal.type, handleDeleteMeal)
  yield takeLeading(removeIngredient.type, handleDeleteMealIngredient)
  yield takeLeading(modifyIngredient.type, handlePatchMealIngredient)
  yield takeLeading(addIngredient.type, handlePostMealIngredient)
  yield takeLeading(addPresetMeal.type, handlePostPresetMeal)
}

function* handleDeleteMeal({ payload }) {
  try {
    yield call(deleteReq, payload)
    yield put(removeMeal(payload))
    success('Meal Removed')
  } catch (err) {
    error(err.response.data.error)
  }
}

function* handlePostMealIngredient({ payload }) {
  try {
    const response = yield call(postIngredient, payload)
    const { data } = response
    yield put(
      addIngredient({
        ...payload,
        _id: data._id,
        ingredient: {
          _id: data.ingredient._id,
          ...payload.ingredient,
        },
      }),
    )
    success('Ingredient Added')
  } catch (err) {
    error(err.response.data.error)
  }
}

function* handlePostPresetMeal({ payload }) {
  try {
    const response = yield call(postPresetMeal, payload)
    const { data } = response
    yield put(addPresetMeal(data))
    success('Preset Meal Added')
  } catch (err) {
    error(err.response.data.error)
  }
}

function* handleGetMeals({ payload }) {
  try {
    const meals = yield select((state) => state.meals)
    if (meals.length === 0) {
      const response = yield call(get)
      const { data } = response
      yield put(setMeals(data.meals))
    }
  } catch (err) {
    error(err.response.data.error)
  }
}

function* handleDeleteMealIngredient({ payload }) {
  try {
    yield call(deleteIngredient, payload)
    yield put(removeIngredient(payload))
    success('Ingredient Removed')
  } catch (err) {
    error(err.response.data.error)
  }
}

function* handlePatchMealIngredient({ payload }) {
  try {
    yield call(patchIngredient, payload)
    yield put(modifyIngredient(payload))
    success('Ingredient Updated')
  } catch (err) {
    error(err.response.data.error)
  }
}
