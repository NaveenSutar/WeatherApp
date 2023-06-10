import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import homeReducer from './reducers';

const rootReducer = combineReducers({ homeReducer });

export const Store = createStore(rootReducer, applyMiddleware(thunk));