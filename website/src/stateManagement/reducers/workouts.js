import { createSlice } from '@reduxjs/toolkit';
import { saveState, removeState } from '../../components/util';

export const slice = createSlice({
  name: 'workouts',
  initialState: {
    current: {
      stages: [],
    },
    history: [],
  },
  reducers: {
    setWorkouts: (state, { payload }) => ({ history: payload || [] }),
    addWorkout: (state, { payload }) => {
      if (payload._id) {
        state.history.unshift(payload);
        removeState('currentWorkout');
        state.current = { stages: [] };
      }
    },
    setCurrentWorkout: (state, { payload }) => {
      saveState('currentWorkout', payload);
      return { ...state, current: payload || { stages: [] } };
    },
    addCurrentExercise: (state, { payload }) => {
      let stage = state.current.stages.find(
        (stage) => stage.id === payload.stageId
      );
      if (!stage) {
        state.current.stages.push({
          id: payload.stageId,
          exercises: [],
        });
        stage = state.current.stages.find((stg) => stg.id === payload.stageId);
      }
      if (stage.exercises.length < payload.newLength)
        stage.exercises.splice(payload.index, 0, {
          sets: [],
          variation: undefined,
          sagittalPlane: undefined,
          id: '',
          rest: { intraset: undefined, interset: 0 },
        });
      saveState('currentWorkout', state.current);
    },
    removeCurrentExercise: (state, { payload }) => {
      const stageIndex = state.current.stages.findIndex(
        (stage) => stage.id === payload.stageId
      );
      if (
        state.current.stages[stageIndex].exercises.length > payload.newLength
      ) {
        state.current.stages[stageIndex].exercises.splice(payload.index, 1);
        if (state.current.stages[stageIndex].exercises.length === 0)
          state.current.stages.splice(stageIndex, 1);
      }
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
      if (sets.length < payload.newLength) {
        if (sets.length > 0) {
          state.current.stages[stageIndex].exercises[payload.index].sets.push(
            sets[sets.length - 1]
          );
          state.current.stages[stageIndex].exercises[
            payload.index
          ].rest.intraset = 0;
        } else
          state.current.stages[stageIndex].exercises[payload.index].sets.push(
            {}
          );
      }
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
      if (sets.length > payload.newLength)
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
