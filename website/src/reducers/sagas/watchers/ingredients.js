import { takeLeading } from 'redux-saga/effects';
import {
  handleIngredientAvailability,
  handlePostIngredient,
  handleSetIngredients,
  handlePatchIngredient,
} from '../handlers/ingredients';
import {
  addIngredient,
  changeAvailability,
  setIngredients,
  patchIngredient,
} from '../../ingredients';

export default function* ingredientWatcher() {
  yield takeLeading(addIngredient.type, handlePostIngredient);
  yield takeLeading(setIngredients.type, handleSetIngredients);
  yield takeLeading(changeAvailability.type, handleIngredientAvailability);
  yield takeLeading(patchIngredient.type, handlePatchIngredient);
}
