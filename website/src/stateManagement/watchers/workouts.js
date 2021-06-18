import { takeLeading, call, put, select } from 'redux-saga/effects';
import {
  addWorkout,
  getWorkouts,
  setWorkouts,
  getCurrentWorkout,
  setCurrentWorkout,
} from '../reducers/workouts';
import { get, post } from '../requests/workouts';
import { loadState } from '../../components/util';
import { success, error } from '../reducers/notification';

export default function* stageWatcher() {
  yield takeLeading(getWorkouts.type, handleGetWorkouts);
  yield takeLeading(addWorkout.type, handlePostWorkout);
  yield takeLeading(getCurrentWorkout.type, handleGetCurrentWorkout);
}

function* handleGetCurrentWorkout({ payload }) {
  const state = loadState('currentWorkout');
  if (state) yield put(setCurrentWorkout(state));
}

function* handleGetWorkouts({ payload }) {
  try {
    const workouts = yield select((state) => state.workouts.history);
    if (workouts.length === 0) {
      const response = yield call(get);
      const { data } = response;
      yield put(setWorkouts(data.workouts));
    }
  } catch (err) {
    error(err.response.data.error);
  }
}

function* handlePostWorkout({ payload }) {
  try {
    const response = yield call(post, payload);
    const { data } = response;
    yield put(addWorkout(data.workout));
    window.location = '/workoutTracker';
  } catch (err) {
    console.log(err);
    error(err.response.data.error);
  }
}
