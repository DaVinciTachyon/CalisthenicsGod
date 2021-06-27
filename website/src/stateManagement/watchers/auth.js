import { takeLeading, call, put } from 'redux-saga/effects'
import { postLogIn, postRegister } from '../requests/auth'
import { logIn, logOut, register } from '../reducers/auth'
import { success, error } from '../reducers/notification'

export default function* authWatcher() {
  yield takeLeading(logIn.type, handleLogIn)
  yield takeLeading(logOut.type, handleLogOut)
  yield takeLeading(register.type, handleRegister)
}

function* handleRegister({ payload }) {
  try {
    yield call(postRegister, payload)
    yield put(register())
    window.location.replace('/login')
    success('Registered!')
  } catch (err) {
    error(err.response.data.error)
  }
}

function* handleLogIn({ payload }) {
  try {
    const response = yield call(postLogIn, payload)
    const { data } = response
    yield put(logIn(data))
    window.location.replace('/')
    success('Logged In!')
  } catch (err) {
    error(err.response.data.error)
  }
}

function* handleLogOut({ payload }) {
  yield put(logOut())
  window.location.replace('/login')
}
