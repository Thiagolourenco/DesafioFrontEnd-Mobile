import {call, put} from 'redux-saga/effects';
import api from '../../services/api';
import {ToastActionsCreators} from 'react-native-redux-toast';

import ListActions from '../ducks/list';

/**
 * Listar Cliente
 */

export function* getList() {
  const response = yield call(api.get, 'customers');

  yield put(ListActions.getListSuccess(response.data));
}

/**
 *
 * Criar Cliente
 */

export function* createUser({name, cpf, birthdate}) {
  try {
    const response = yield call(api.post, 'customers', {name, cpf, birthdate});

    yield put(ListActions.createUserSuccess(response.data));
    yield put(
      ToastActionsCreators.displayInfo('Cliente adicionado com sucesso'),
    );
  } catch (err) {
    // alert(err);
    // // yield put(
    // //   ToastActionsCreators.displayError('Ocorreu um error nas credencias'),
    // // );
    console.log(err);
  }
}

/**
 * Listar dados de um cliente
 */

export function* getListId({id}) {
  const response = yield call(api.get, 'customers', {id});

  yield put(ListActions.getListIdSuccess(response.data));
}

/**
 * ATUALIZAR USUÁRIO
 */

export function* updateUser({id, name, cpf, birthdate}) {
  try {
    yield call(api.put, `customers/${id}`, {
      name,
      cpf,
      birthdate,
    });

    yield put(ToastActionsCreators.displayInfo('Cliente alterado com sucesso'));
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Ocorreu um error nas /'));
  }
}

/**
 * Deletar Usuário
 */

export function* deleteUser({id}) {
  try {
    yield call(api.delete, `customers/${id}`);

    yield put(
      ToastActionsCreators.displayWarning('Usuário Removido com sucesso'),
    );
  } catch (err) {
    yield put(ToastActionsCreators.displayError('Ocorreu um error nas /'));
  }
}
