import {combineReducers} from 'redux';

import {reducer as list} from './list';

export default combineReducers({
  list,
});
