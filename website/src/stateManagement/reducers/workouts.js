import { createSlice } from '@reduxjs/toolkit';
import { saveState, removeState } from '../../components/util';

export const slice = createSlice({
  name: 'workouts',
  initialState: { current: {}, history: [] },
  reducers: {
    setWorkouts: (state, { payload }) => ({ history: payload || [] }),
    addWorkout: (state, { payload }) => {
      if (payload._id) {
        console.log(payload); //FIXME remove empty stages
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
        exercises.splice(payload.index, 0, {
          sets: [],
          variation: undefined,
          sagittalPlane: undefined,
          id: '',
          rest: { intraset: undefined, interset: 0 },
        });
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
      state.current.stages[stageIndex].exercises[payload.index] = {
        ...state.current.stages[stageIndex].exercises[payload.index],
        ...payload.exercise,
      };
      saveState('currentWorkout', state.current);
    },
    addCurrentExerciseSet: (state, { payload }) => {
      const stageIndex = state.current.stages.findIndex(
        (stage) => stage.id === payload.stageId
      );
      const sets =
        state.current.stages[stageIndex].exercises[payload.index].sets;
      if (!sets)
        state.current.stages[stageIndex].exercises[payload.index].sets = [];
      if (sets.length < payload.currentLength + 1) {
        if (sets.length > 0)
          state.current.stages[stageIndex].exercises[payload.index].sets.push(
            sets[sets.length - 1]
          );
        else
          state.current.stages[stageIndex].exercises[payload.index].sets.push(
            {}
          );
      }
      if (sets.length > 1)
        state.current.stages[stageIndex].exercises[
          payload.index
        ].rest.intraset = 0;
      saveState('currentWorkout', state.current);
    },
    removeCurrentExerciseSet: (state, { payload }) => {
      const stageIndex = state.current.stages.findIndex(
        (stage) => stage.id === payload.stageId
      );
      const sets =
        state.current.stages[stageIndex].exercises[payload.index].sets;
      if (!sets)
        state.current.stages[stageIndex].exercises[payload.index].sets = [];
      if (sets.length > payload.currentLength - 1)
        state.current.stages[stageIndex].exercises[payload.index].sets.pop();
      if (sets.length <= 1)
        state.current.stages[stageIndex].exercises[
          payload.index
        ].rest.intraset = undefined;
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
  addCurrentExerciseSet,
  removeCurrentExerciseSet,
  modifyCurrentExerciseSet,
} = slice.actions;

export default slice.reducer;
