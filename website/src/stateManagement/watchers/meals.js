import { takeLeading } from 'redux-saga/effects';
import {
  handleDeleteMealIngredient,
  handleGetMeals,
  handlePatchMealIngredient,
  handlePostMealIngredient,
  handlePostPresetMeal,
} from '../handlers/meals';
import {
  addIngredient,
  modifyIngredient,
  removeIngredient,
  setMeals,
  addPresetMeal,
} from '../reducers/meals';

export default function* mealWatcher() {
  yield takeLeading(setMeals.type, handleGetMeals);
  yield takeLeading(removeIngredient.type, handleDeleteMealIngredient);
  yield takeLeading(modifyIngredient.type, handlePatchMealIngredient);
  yield takeLeading(addIngredient.type, handlePostMealIngredient);
  yield takeLeading(addPresetMeal.type, handlePostPresetMeal);
}
