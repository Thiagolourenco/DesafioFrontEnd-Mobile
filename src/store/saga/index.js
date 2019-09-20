import {all, takeLatest} from 'redux-saga/effects';

import {getList, createUser, getListId} from './list';
import {ListTypes} from '../ducks/list';

export default function* rootSaga() {
  return yield all([
    takeLatest(ListTypes.GET_LIST_REQUEST, getList),
    takeLatest(ListTypes.CREATE_USER_REQUEST, createUser),
    takeLatest(ListTypes.GET_LIST_ID_REQUEST, getListId),
  ]);
}
