import { takeLeading } from 'redux-saga/effects';
import { handleGetUser, handlePatchUser } from '../handlers/user';
import { setUserInfo, modifyUserInfo } from '../reducers/user';

export default function* userWatcher() {
  yield takeLeading(setUserInfo.type, handleGetUser);
  yield takeLeading(modifyUserInfo.type, handlePatchUser);
}
