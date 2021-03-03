import { createAsyncThunk } from 'common/utils/asyncUtils';
import * as authApi from 'api/auth';

//action type
export const REQUEST_LOGIN = 'auth/REQUEST_LOGIN';
export const REQUEST_LOGIN_SUCCESS = 'auth/REQUEST_LOGIN_SUCCESS';
export const REQUEST_LOGIN_FAILED = 'auth/REQUEST_LOGIN_FAILED';

export const REQUEST_AUTH_LOGIN = 'auth/REQUEST_AUTO_LOGIN';
export const REQUEST_AUTH_LOGIN_SUCCESS = 'auth/REQUEST_AUTO_LOGIN_SUCCESS';

//action creator
export const requestAutoLogin = () => ({
    type: REQUEST_AUTH_LOGIN
});

//redux thunk
export const requestLoginThunk = createAsyncThunk(
    REQUEST_LOGIN, 
    authApi.login
);

// export const requestAuthLogin = () => async (dispatch, getState) => {
//     dispatch()
// }

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
                ownerId,
                serviceCategory,
                serviceName,
                location,
                totalRoomCount,
                totalSeatCount,
            } = action.payload;

            return {
                ...state,
                isLogin: true,
                owner: {
                    id: ownerId
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
        // case REUQEST_AUTH_LOGIN:
        // case REQUEST_AUTH_LOGIN_SUCCESS:
        //     return handleAuthLogin(state, action);
        default:
            return state;
    }
}