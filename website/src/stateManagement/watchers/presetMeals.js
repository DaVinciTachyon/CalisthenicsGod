import { takeLeading } from 'redux-saga/effects';
import {
  handlePostPresetMealIngredient,
  handleGetPresetMeals,
  handleDeletePresetMeal,
} from '../handlers/presetMeals';
import {
  addIngredient,
  setPresetMeals,
  deletePresetMeal,
} from '../reducers/presetMeals';

export default function* presetMealWatcher() {
  yield takeLeading(addIngredient.type, handlePostPresetMealIngredient);
  yield takeLeading(setPresetMeals.type, handleGetPresetMeals);
  yield takeLeading(deletePresetMeal.type, handleDeletePresetMeal);
}
