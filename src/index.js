import React, {Fragment} from 'react';
import {Provider} from 'react-redux';
import {Toast} from 'react-native-redux-toast';

import Routes from './routes';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <Toast />
      <Routes />
    </Fragment>
  </Provider>
);

export default App;
