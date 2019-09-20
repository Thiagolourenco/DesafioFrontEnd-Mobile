import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './ducks';
import rootSaga from './saga';

const sagaMiddlewares = createSagaMiddleware();

const middlewares = [sagaMiddlewares];

const store = createStore(rootReducers, applyMiddleware(...middlewares));

sagaMiddlewares.run(rootSaga);

export default store;
