import { createSlice } from '@reduxjs/toolkit'
import { saveState, removeState } from '../../components/util'

export const slice = createSlice({
  name: 'workouts',
  initialState: {
    current: {
      stages: [],
    },
    history: [],
  },
  reducers: {
    getWorkouts: () => {},
    setWorkouts: (state, { payload }) => ({ history: payload }),
    addWorkout: (state, { payload }) => {
      if (payload._id) {
        state.history.unshift(payload)
        removeState('currentWorkout')
        state.current = { stages: [] }
      }
    },
    getCurrentWorkout: () => {},
    setCurrentWorkout: (state, { payload }) => {
      saveState('currentWorkout', payload)
      return { ...state, current: payload || { stages: [] } }
    },
    addCurrentExercise: (state, { payload }) => {
      let stage = state.current.stages.find(
        (stage) => stage.id === payload.stageId,
      )
      if (!stage) {
        state.current.stages.push({
          id: payload.stageId,
          exercises: [],
        })
        stage = state.current.stages.find((stg) => stg.id === payload.stageId)
      }
      if (stage.exercises.length < payload.newLength)
        stage.exercises.push(payload.exercise)
      saveState('currentWorkout', state.current)
    },
    removeCurrentExercise: (state, { payload }) => {
      const stageIndex = state.current.stages.findIndex(
        (stage) => stage.id === payload.stageId,
      )
      if (
        state.current.stages[stageIndex].exercises.length > payload.newLength
      ) {
        state.current.stages[stageIndex].exercises.splice(payload.index, 1)
        if (state.current.stages[stageIndex].exercises.length === 0)
          state.current.stages.splice(stageIndex, 1)
      }
      saveState('currentWorkout', state.current)
    },
    modifyCurrentExercise: (state, { payload }) => {
      const stageIndex = state.current.stages.findIndex(
        (stage) => stage.id === payload.stageId,
      )
      state.current.stages[stageIndex].exercises[payload.index] = {
        ...state.current.stages[stageIndex].exercises[payload.index],
        ...payload.exercise,
      }
      saveState('currentWorkout', state.current)
    },
  },
})

export const {
  getWorkouts,
  setWorkouts,
  addWorkout,
  setCurrentWorkout,
  getCurrentWorkout,
  addCurrentExercise,
  removeCurrentExercise,
  modifyCurrentExercise,
} = slice.actions

export default slice.reducer
