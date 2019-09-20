import {call, put} from 'redux-saga/effects';
import api from '../../services/api';

import ListActions from '../ducks/list';

export function* getList() {
  const response = yield call(api.get, 'customers');

  yield put(ListActions.getListSuccess(response.data));
}

export function* createUser({name, cpf, birthdate}) {
  try {
    const response = yield call(api.post, 'customers', {name, cpf, birthdate});

    yield put(ListActions.createUserSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

export function* getListId({id}) {
  const response = yield call(api.get, 'customers', {id});

  yield put(ListActions.getListIdSuccess(response.data));
}
