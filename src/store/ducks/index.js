import {combineReducers} from 'redux';

import {toastReducer as toast} from 'react-native-redux-toast';
import {reducer as list} from './list';

export default combineReducers({
  list,
  toast,
});
