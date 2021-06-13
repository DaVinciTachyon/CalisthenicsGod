import { takeLeading } from 'redux-saga/effects';
import {
  handleGetMeasurementHistory,
  handleGetMeasurements,
  handlePostMeasurements,
  handleGetMeasurement,
} from '../handlers/measurements';
import {
  getMeasurementHistory,
  setMeasurements,
  addMeasurements,
  setMeasurement,
} from '../reducers/measurements';

export default function* measurementWatcher() {
  yield takeLeading(setMeasurements.type, handleGetMeasurements);
  yield takeLeading(setMeasurement.type, handleGetMeasurement);
  yield takeLeading(addMeasurements.type, handlePostMeasurements);
  yield takeLeading(getMeasurementHistory.type, handleGetMeasurementHistory);
}
