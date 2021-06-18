import { takeLeading, call, put, select } from 'redux-saga/effects';
import {
  addExercise,
  setExercises,
  getExercises,
  modifyExercise,
  removeExercise,
} from '../reducers/exercises';
import { deleteReq, get, patch, post } from '../requests/exercises';
import { success, error } from '../reducers/notification';

export default function* exerciseWatcher() {
  yield takeLeading(addExercise.type, handlePostExercise);
  yield takeLeading(modifyExercise.type, handlePatchExercise);
  yield takeLeading(removeExercise.type, handleDeleteExercise);
  yield takeLeading(getExercises.type, handleGetExercises);
}

function* handleGetExercises({ payload }) {
  try {
    const exercises = yield select((state) => state.exercises);
    if (exercises.length === 0) {
      const response = yield call(get);
      const { data } = response;
      yield put(setExercises(data.exercises));
    }
  } catch (err) {
    console.error(err.response);
  }
}

function* handleDeleteExercise({ payload }) {
  try {
    yield call(deleteReq, payload);
    yield put(removeExercise(payload));
  } catch (err) {
    console.error(err.response);
  }
}

function* handlePostExercise({ payload }) {
  try {
    const response = yield call(post, payload);
    const { data } = response;
    yield put(addExercise(data));
  } catch (err) {
    console.error(err.response);
  }
}

function* handlePatchExercise({ payload }) {
  try {
    yield call(patch, payload);
    yield put(modifyExercise(payload));
  } catch (err) {
    console.error(err.response);
  }
}
