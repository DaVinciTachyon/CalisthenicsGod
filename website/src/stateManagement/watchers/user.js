import { takeLeading } from 'redux-saga/effects';
import {
  handleGetUser,
  handlePatchNutritionInfo,
  handleGetNutritionInfo,
  handlePatchUser,
} from '../handlers/user';
import {
  setUserInfo,
  modifyUserInfo,
  setNutritionInfo,
  modifyNutritionInfo,
} from '../reducers/user';

export default function* userWatcher() {
  yield takeLeading(setUserInfo.type, handleGetUser);
  yield takeLeading(modifyUserInfo.type, handlePatchUser);
  yield takeLeading(setNutritionInfo.type, handleGetNutritionInfo);
  yield takeLeading(modifyNutritionInfo.type, handlePatchNutritionInfo);
}
