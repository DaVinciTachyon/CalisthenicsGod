import { takeLeading, call, put, select } from 'redux-saga/effects';
import {
  addStage,
  modifyStage,
  removeStage,
  setStages,
  getStages,
} from '../reducers/stages';
import { deleteReq, get, patch, post } from '../requests/stages';
import { success, error } from '../reducers/notification';

export default function* stageWatcher() {
  yield takeLeading(getStages.type, handleGetStages);
  yield takeLeading(removeStage.type, handleDeleteStage);
  yield takeLeading(addStage.type, handlePostStage);
  yield takeLeading(modifyStage.type, handlePatchStage);
}

function* handleGetStages({ payload }) {
  try {
    const stages = yield select((state) => state.stages);
    if (stages.length === 0) {
      const response = yield call(get);
      const { data } = response;
      yield put(setStages(data.stages));
    }
  } catch (err) {
    console.error(err.response);
  }
}

function* handleDeleteStage({ payload }) {
  try {
    yield call(deleteReq, payload);
    yield put(removeStage(payload));
  } catch (err) {
    console.error(err.response);
  }
}

function* handlePostStage({ payload }) {
  try {
    const response = yield call(post, payload);
    const { data } = response;
    yield put(addStage({ ...payload, _id: data._id }));
  } catch (err) {
    console.error(err.response);
  }
}

function* handlePatchStage({ payload }) {
  try {
    yield call(patch, payload);
    yield put(modifyStage(payload));
  } catch (err) {
    console.error(err.response);
  }
}
