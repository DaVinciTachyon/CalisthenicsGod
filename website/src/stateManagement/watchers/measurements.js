import { takeLeading, call, put } from 'redux-saga/effects';
import {
  getMeasurementHistory,
  setMeasurements,
  addMeasurements,
  setMeasurement,
} from '../reducers/measurements';
import { get, post, getHistory } from '../requests/measurements';

export default function* measurementWatcher() {
  yield takeLeading(setMeasurements.type, handleGetMeasurements);
  yield takeLeading(setMeasurement.type, handleGetMeasurement);
  yield takeLeading(addMeasurements.type, handlePostMeasurements);
  yield takeLeading(getMeasurementHistory.type, handleGetMeasurementHistory);
}

function* handlePostMeasurements({ payload }) {
  try {
    const response = yield call(post, payload);
    const { data } = response;
    yield put(addMeasurements(data));
    window.location = '/measurementTracker';
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
