import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

const {Types, Creators} = createActions({
  getListSuccess: ['data'],
  getListRequest: null,
  createUserRequest: ['name', 'cpf', 'birthdate'],
  createUserSuccess: ['data'],
  getListIdSuccess: ['data'],
  getListIdRequest: null,
  deleteUserRequest: ['id'],
  deleteUserSuccess: ['data'],
});

export const ListTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: [],
});

export const success = (state, {data}) => state.merge({data});

export const createUser = (state, {data}) =>
  state.merge({data: [...state.data, data]});

export const successId = (state, {data}) => state.merge({data});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LIST_SUCCESS]: success,
  [Types.CREATE_USER_SUCCESS]: createUser,
  [Types.GET_LIST_ID_SUCCESS]: successId,
});
