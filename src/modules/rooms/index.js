import { createAsyncThunk } from 'common/utils/asyncUtils';

import * as roomApi from 'api/room';

//action type
export const GET_ROOM_LIST = 'rooms/GET_ROOM_LIST';
export const GET_ROOM_LIST_SUCCESS = 'rooms/GET_ROOM_LIST_SUCCESS';
export const GET_ROOM_LIST_FAILED = 'rooms/GET_ROOM_LIST_FAILED';

export const CREATE_ROOM = 'rooms/CREATE_ROOM';
export const CREATE_ROOM_SUCCESS = 'rooms/CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_FAILED = 'rooms/CREATE_ROOM_FAILED';

export const GET_ROOM = 'rooms/GET_ROOM';
export const GET_ROOM_SUCCESS = 'rooms/GET_ROOM_SUCCESS';
export const GET_ROOM_FAILED = 'rooms/GET_ROOM_FAILED';

export const MODIFY_ROOM = 'rooms/MODIFY_ROOM';
export const MODIFY_ROOM_SUCCESS = 'rooms/MODIFY_ROOM_SUCCESS';
export const MODIFY_ROOM_FAILED = 'rooms/MODIFY_ROOM_FAILED';

export const DELETE_ROOM = 'rooms/DELETE_ROOM';
export const DELETE_ROOM_SUCCESS = 'rooms/DELETE_ROOM_SUCCESS';
export const DELETE_ROOM_FAILED = 'rooms/DELETE_ROOM_FAILED';

//redux thunk
export const getRoomListThunk = createAsyncThunk(GET_ROOM_LIST, roomApi.getRoomList);

export const createRoomThunk = createAsyncThunk(CREATE_ROOM, roomApi.createRoom);

export const getRoomThunk = createAsyncThunk(GET_ROOM, roomApi.getRoom);

export const modifyRoomThunk = createAsyncThunk(MODIFY_ROOM, roomApi.modifyRoom);

export const deleteRoomThunk = createAsyncThunk(DELETE_ROOM, roomApi.deleteRoom);

const initialState = {
    byId: {},
    allIds: [],
}

//case reducer
function handleRoomListActions(state, action){
    switch(action.type){
        case GET_ROOM_LIST_SUCCESS:
            const rooms = action.payload;
            //room: {id, number, name, colSeatCount, rowSeatCount, seatCount,
            //  hasSeats, seatCountInUse}

            return {
                ...state,
               byId: rooms.reduce((obj, room) => {
                   obj[room.id] = {
                      ...room
                   };

                   return obj;
               }, {}),
               allIds: rooms.map(room => room.id)
            };
        case GET_ROOM_LIST_FAILED:
            return {
                byId: {},
                allIds: []
            };
    }
}

function handleRoomActionsSuccess(state, action){
    switch(action.type){
        case GET_ROOM_SUCCESS:
            //payload: { id, name, number, colSeatCount, rowSeatCount, seatCount }

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                        ...action.payload
                    }                   
                }
            }
        
        case CREATE_ROOM_SUCCESS:
            //payload: { id, name, number, colSeatCount, rowSeatCount, seatCount}

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                        ...action.payload
                    }
                },
                allIds: state.allIds.concat(action.payload.id)
            }
        case MODIFY_ROOM_SUCCESS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.id]: {
                        ...action.payload
                    }
                }
            }
        case DELETE_ROOM_SUCCESS:
            delete state.byId[action.payload.id];

            return {
                ...state,
                byId: {
                    ...state.byId,
                },
                allIds: state.allIds.filter(id => id != action.payload.id)
            }
    }
    
}

function handleRoomActionsFailed(state, action){
    return {
        ...state
    }
}

//slice reducer
export default function roomReducer(state = initialState, action){
    switch(action.type){
        case GET_ROOM_LIST_SUCCESS:
        case GET_ROOM_LIST_FAILED:
                return handleRoomListActions(state, action);
        case GET_ROOM_SUCCESS:
        case CREATE_ROOM_SUCCESS:
        case MODIFY_ROOM_SUCCESS:
        case DELETE_ROOM_SUCCESS:
            return handleRoomActionsSuccess(state, action);
        case GET_ROOM_FAILED:
        case CREATE_ROOM_FAILED:
        case MODIFY_ROOM_FAILED:
        case DELETE_ROOM_FAILED:
            return handleRoomActionsFailed(state, action);
        default:
            return state
    }
}

