import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  getListSuccess: ['data'],
  getListRequest: null,
  createUserRequest: ['name', 'cpf', 'birthdate'],
  createUserSuccess: ['data'],
  deleteUserRequest: ['id'],
  deleteUserSuccess: ['data'],
  updateUserRequest: ['id', 'name', 'cpf', 'birthdate'],
  updateUserSuccess: ['data'],
});

export const ListTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
});

export const success = (state, {data}) => state.merge({data});

export const createUser = (state, {data}) =>
  state.merge({data: [...state.data, data]});

export const updateUser = (state, {id, name, cpf, birthdate}) =>
  state.merge({
    data: [...state.data, id, name, cpf, birthdate],
  });

export const deleteUser = (state, {id}) =>
  state.merge({
    data: state.data.map(userdel =>
      userdel.id === id ? {...userdel} : userdel,
    ),
  });

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_SUCCESS]: success,
  [Types.CREATE_USER_SUCCESS]: createUser,
  [Types.UPDATE_USER_SUCCESS]: updateUser,
  [Types.DELETE_USER_SUCCESS]: deleteUser,
});
