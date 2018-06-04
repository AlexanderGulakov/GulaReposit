import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import app from './app';
import users from './users';

const extendedReducers = Object.assign({}, {
    app,
    users
}, {
    routing
});

export default combineReducers(extendedReducers);