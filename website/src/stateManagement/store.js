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

const reducer = combineReducers({
  ingredients,
  presetMeals,
  meals,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(ingredientWatcher);
sagaMiddleware.run(presetMealWatcher);
sagaMiddleware.run(mealWatcher);

export default store;
