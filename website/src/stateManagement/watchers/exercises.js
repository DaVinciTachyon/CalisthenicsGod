import { takeLeading } from 'redux-saga/effects';
import {
  handleDeleteExercise,
  handleGetExercises,
  handlePatchExercise,
  handlePostExercise,
} from '../handlers/exercises';
import {
  addExercise,
  setExercises,
  modifyExercise,
  removeExercise,
} from '../reducers/exercises';

export default function* exerciseWatcher() {
  yield takeLeading(addExercise.type, handlePostExercise);
  yield takeLeading(modifyExercise.type, handlePatchExercise);
  yield takeLeading(removeExercise.type, handleDeleteExercise);
  yield takeLeading(setExercises.type, handleGetExercises);
}
