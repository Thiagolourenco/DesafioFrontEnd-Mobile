import {all, takeLatest} from 'redux-saga/effects';

import {getList, createUser, updateUser, deleteUser} from './list';
import {ListTypes} from '../ducks/list';

export default function* rootSaga() {
  return yield all([
    takeLatest(ListTypes.GET_LIST_REQUEST, getList),
    takeLatest(ListTypes.CREATE_USER_REQUEST, createUser),
    takeLatest(ListTypes.UPDATE_USER_REQUEST, updateUser),
    takeLatest(ListTypes.DELETE_USER_REQUEST, deleteUser),
  ]);
}
