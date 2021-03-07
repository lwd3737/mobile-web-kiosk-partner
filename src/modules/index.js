import { combineReducers } from 'redux';

import appStatusReducer from './appStatus';
import authReducer from './auth';
import roomsReducer from './rooms';
import seatsReducer from './seats';

const rootReducer = combineReducers({
    appStatus: appStatusReducer,
    auth: authReducer,
    rooms: roomsReducer,
    seats: seatsReducer
});

export default rootReducer;