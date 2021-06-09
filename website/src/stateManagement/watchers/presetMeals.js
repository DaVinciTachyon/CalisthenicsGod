import { takeLeading } from 'redux-saga/effects';
import {
  handlePostPresetMealIngredient,
  handleDeletePresetMealIngredient,
  handlePatchPresetMealIngredient,
  handleGetPresetMeals,
  handleDeletePresetMeal,
  handlePostPresetMeal,
} from '../handlers/presetMeals';
import {
  addIngredient,
  modifyIngredient,
  removeIngredient,
  setPresetMeals,
  deletePresetMeal,
  addPresetMeal,
} from '../reducers/presetMeals';

export default function* presetMealWatcher() {
  yield takeLeading(addIngredient.type, handlePostPresetMealIngredient);
  yield takeLeading(modifyIngredient.type, handlePatchPresetMealIngredient);
  yield takeLeading(removeIngredient.type, handleDeletePresetMealIngredient);
  yield takeLeading(setPresetMeals.type, handleGetPresetMeals);
  yield takeLeading(deletePresetMeal.type, handleDeletePresetMeal);
  yield takeLeading(addPresetMeal.type, handlePostPresetMeal);
}
