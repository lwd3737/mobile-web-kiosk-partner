import { createAsyncThunk } from 'common/utils/asyncUtils';
import * as authApi from 'api/auth';

//action type
export const REQUEST_LOGIN = 'partner/REQUEST_LOGIN';
export const REQUEST_LOGIN_SUCCESS = 'partner/REQUEST_LOGIN_SUCCESS';
export const REQUEST_LOGIN_FAILED = 'partner/REQUEST_LOGIN_FAILED';

//redux thunk
export const requestLoginThunk = createAsyncThunk(
    REQUEST_LOGIN, 
    authApi.login
);

const initialState = {
    isLogin: false,
    owner: {
        id: null,
        username: null
    },
    partner: {
        id: null,
        serviceCategory: null,
        serviceName: null,
        location: null,
        totalRoomCount: null,
        totalSeatCount: null
    }
}

//case reducer
function handleLogin(state, action){
    switch(action.type){
        case REQUEST_LOGIN_SUCCESS:
            const { 
                id, 
                serviceCategory,
                serviceName,
                location,
                totalRoomCount,
                totalSeatCount,
                owner
            } = action.payload;

            return {
                ...state,
                isLogin: true,
                owner: {
                    id: owner.id,
                    username: owner.username
                },
                partner: {
                    id,
                    serviceCategory,
                    serviceName,
                    location,
                    totalRoomCount,
                    totalSeatCount
                }
            };
        case REQUEST_LOGIN_FAILED:
            return {
                ...state,
                isLogin: false,
                owner: {
                    id: null,
                    username: null
                },
                partner: {
                    id: null,
                    serviceCategory: null,
                    serviceName: null,
                    location: null
                }
            }
    }
}

//slice reducer
export default function authReducer(state = initialState, action){
    switch(action.type){
        case REQUEST_LOGIN_SUCCESS:
        case REQUEST_LOGIN_FAILED:
            return handleLogin(state, action);
        default:
            return state;
    }
}