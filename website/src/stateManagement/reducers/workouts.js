import { createSlice } from '@reduxjs/toolkit';
import { saveState, removeState } from '../../components/util';

export const slice = createSlice({
  name: 'workouts',
  initialState: { current: {}, history: [] },
  reducers: {
    setWorkouts: (state, { payload }) => ({ history: payload || [] }),
    addWorkout: (state, { payload }) => {
      if (payload._id) {
        state.history.unshift(payload);
        removeState('currentWorkout');
        return { current: {} };
      }
    },
    setCurrentWorkout: (state, { payload }) => {
      saveState('currentWorkout', payload);
      return { current: payload || {} };
    },
    addCurrentExercise: (state, { payload }) => {
      const exercises = state.current.stages.find(
        (stage) => stage.id === payload.stageId
      ).exercises;
      if (exercises.length < payload.currentLength + 1)
        exercises.splice(payload.index, 0, {});
      saveState('currentWorkout', state.current);
    },
    removeCurrentExercise: (state, { payload }) => {
      const exercises = state.current.stages.find(
        (stage) => stage.id === payload.stageId
      ).exercises;
      if (exercises.length > payload.currentLength - 1)
        exercises.splice(payload.index, 1);
      saveState('currentWorkout', state.current);
    },
    modifyCurrentExercise: (state, { payload }) => {
      const stageIndex = state.current.stages.findIndex(
        (stage) => stage.id === payload.stageId
      );
      state.current.stages[stageIndex].exercises[payload.index] =
        payload.exercise;
      saveState('currentWorkout', state.current);
    },
    modifyCurrentExerciseSet: (state, { payload }) => {
      const stageIndex = state.current.stages.findIndex(
        (stage) => stage.id === payload.stageId
      );
      state.current.stages[stageIndex].exercises[payload.exerciseIndex].sets[
        payload.index
      ] = payload.set;
      saveState('currentWorkout', state.current);
    },
  },
});

export const {
  setWorkouts,
  addWorkout,
  setCurrentWorkout,
  addCurrentExercise,
  removeCurrentExercise,
  modifyCurrentExercise,
  modifyCurrentExerciseSet,
} = slice.actions;

export default slice.reducer;
