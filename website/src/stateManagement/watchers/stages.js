import { takeLeading } from 'redux-saga/effects';
import {
  handleDeleteStage,
  handleGetStages,
  handlePatchStage,
  handlePostStage,
} from '../handlers/stages';
import {
  addStage,
  modifyStage,
  removeStage,
  setStages,
} from '../reducers/stages';

export default function* stageWatcher() {
  yield takeLeading(setStages.type, handleGetStages);
  yield takeLeading(removeStage.type, handleDeleteStage);
  yield takeLeading(addStage.type, handlePostStage);
  yield takeLeading(modifyStage.type, handlePatchStage);
}
