import { call, put } from 'redux-saga/effects';
import {
  addMeasurements,
  setMeasurements,
  setMeasurement,
  getMeasurementHistory,
} from '../reducers/measurements';
import { get, post, getHistory } from '../requests/measurements';

function* handlePostMeasurements({ payload }) {
  try {
    const response = yield call(post, payload);
    const { data } = response;
    yield put(addMeasurements(data));
  } catch (err) {
    console.error(err.response);
  }
}

function* handleGetMeasurements({ payload }) {
  try {
    const response = yield call(get);
    const { data } = response;
    yield put(setMeasurements(data));
  } catch (err) {
    console.error(err.response);
  }
}

function* handleGetMeasurementHistory({ payload }) {
  try {
    const response = yield call(getHistory, payload);
    const { data } = response;
    yield put(getMeasurementHistory({ name: payload, ...data }));
  } catch (err) {
    console.error(err.response);
  }
}

function* handleGetMeasurement({ payload }) {
  try {
    const response = yield call(get, payload);
    const { data } = response;
    yield put(setMeasurement(data));
  } catch (err) {
    console.error(err.response);
  }
}

export {
  handleGetMeasurementHistory,
  handleGetMeasurements,
  handlePostMeasurements,
  handleGetMeasurement,
};
