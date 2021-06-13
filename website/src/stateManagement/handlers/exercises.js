import { call, put } from 'redux-saga/effects';
import {
  setExercises,
  removeExercise,
  addExercise,
  modifyExercise,
} from '../reducers/exercises';
import { deleteReq, get, patch, post } from '../requests/exercises';

function* handleGetExercises({ payload }) {
  try {
    const response = yield call(get);
    const { data } = response;
    yield put(setExercises(data.exercises));
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
    yield put(addExercise({ ...payload, _id: data._id }));
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

export {
  handleDeleteExercise,
  handlePostExercise,
  handlePatchExercise,
  handleGetExercises,
};
