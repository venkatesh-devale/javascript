import {combineReducers} from 'redux';
import userReducer from './reducer-users';
import activeUserReducer from './reducer-user-active';

const allReducers = combineReducers({
    users: userReducer,
    activeUser: activeUserReducer
});

export default allReducers;