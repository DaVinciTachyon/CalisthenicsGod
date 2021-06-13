import {
  combineReducers,
  createStore,
  applyMiddleware,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import ingredients from './reducers/ingredients';
import ingredientWatcher from './watchers/ingredients';
import presetMeals from './reducers/presetMeals';
import presetMealWatcher from './watchers/presetMeals';
import meals from './reducers/meals';
import mealWatcher from './watchers/meals';
import stages from './reducers/stages';
import stageWatcher from './watchers/stages';
import exercises from './reducers/exercises';
import exerciseWatcher from './watchers/exercises';
import workouts from './reducers/workouts';
import workoutWatcher from './watchers/workouts';
import auth from './reducers/auth';
import authWatcher from './watchers/auth';
import measurements from './reducers/measurements';
import measurementWatcher from './watchers/measurements';

const reducer = combineReducers({
  ingredients,
  presetMeals,
  meals,
  stages,
  exercises,
  workouts,
  auth,
  measurements,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(ingredientWatcher);
sagaMiddleware.run(presetMealWatcher);
sagaMiddleware.run(mealWatcher);
sagaMiddleware.run(stageWatcher);
sagaMiddleware.run(exerciseWatcher);
sagaMiddleware.run(workoutWatcher);
sagaMiddleware.run(authWatcher);
sagaMiddleware.run(measurementWatcher);

export default store;
