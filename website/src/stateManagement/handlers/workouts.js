import { call, put } from 'redux-saga/effects';
import { addWorkout, setWorkouts } from '../reducers/workouts';
import { get, post } from '../requests/workouts';

function* handleGetWorkouts({ payload }) {
  try {
    const response = yield call(get);
    const { data } = response;
    yield put(setWorkouts(data.workouts));
  } catch (err) {
    console.error(err.response);
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
    console.error(err.response);
  }
}

export { handleGetWorkouts, handlePostWorkout };
