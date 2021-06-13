import { takeLeading } from 'redux-saga/effects';
import { handleLogIn, handleRegister, handleLogOut } from '../handlers/auth';
import { logIn, logOut, register } from '../reducers/auth';

export default function* authWatcher() {
  yield takeLeading(logIn.type, handleLogIn);
  yield takeLeading(logOut.type, handleLogOut);
  yield takeLeading(register.type, handleRegister);
}
