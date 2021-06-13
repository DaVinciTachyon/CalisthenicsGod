import { takeLeading } from 'redux-saga/effects';
import { handleGetWorkouts, handlePostWorkout } from '../handlers/workouts';
import { addWorkout, setWorkouts } from '../reducers/workouts';

export default function* stageWatcher() {
  yield takeLeading(setWorkouts.type, handleGetWorkouts);
  yield takeLeading(addWorkout.type, handlePostWorkout);
}
