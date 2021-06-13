import { takeLeading } from 'redux-saga/effects';
import { handleLogIn, handleRegister, handleLogOut } from '../handlers/user';
import { logIn, logOut, register } from '../reducers/user';

export default function* userWatcher() {
  yield takeLeading(logIn.type, handleLogIn);
  yield takeLeading(logOut.type, handleLogOut);
  yield takeLeading(register.type, handleRegister);
}
