import {
  combineReducers,
  createStore,
  applyMiddleware,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import ingredients from './ingredients';
import ingredientWatcher from './sagas/watchers/ingredients';

const reducer = combineReducers({
  ingredients,
});

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(ingredientWatcher);

export default store;
