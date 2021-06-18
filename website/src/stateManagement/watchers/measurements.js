import { takeLeading, call, put, select } from 'redux-saga/effects';
import {
  getMeasurementHistory,
  setMeasurementHistory,
  getMeasurements,
  addMeasurements,
  getMeasurement,
  setMeasurements,
} from '../reducers/measurements';
import { get, post, getHistory } from '../requests/measurements';

export default function* measurementWatcher() {
  yield takeLeading(getMeasurements.type, handleGetMeasurements);
  yield takeLeading(getMeasurement.type, handleGetMeasurement);
  yield takeLeading(addMeasurements.type, handlePostMeasurements);
  yield takeLeading(getMeasurementHistory.type, handleGetMeasurementHistory);
}

function* handlePostMeasurements({ payload }) {
  try {
    const response = yield call(post, payload);
    const { data } = response;
    yield put(setMeasurements(data));
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
    yield put(setMeasurementHistory({ name: payload, ...data }));
  } catch (err) {
    console.error(err.response);
  }
}

function* handleGetMeasurement({ payload }) {
  try {
    const measurements = yield select((state) => state.measurements[payload]);
    if (!measurements || measurements.length === 0) {
      const response = yield call(get, payload);
      const { data } = response;
      yield put(setMeasurements(data));
    }
  } catch (err) {
    console.error(err.response);
  }
}
