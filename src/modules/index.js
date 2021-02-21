import { combineReducers } from 'redux';

import appStatusReducer from './appStatus';
import authReducer from './auth';
import roomsReducer from './rooms';


const rootReducer = combineReducers({
    appStatus: appStatusReducer,
    auth: authReducer,
    rooms: roomsReducer
});

export default rootReducer;