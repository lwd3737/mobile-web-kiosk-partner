import { createAsyncThunk } from 'common/utils/asyncUtils';

import * as roomApi from 'api/room';

//action type
export const GET_ROOM_LIST = 'rooms/GET_ROOM_LIST';
export const GET_ROOM_LIST_SUCCESS = 'rooms/GET_ROOM_LIST_SUCCESS';
export const GET_ROOM_LIST_FAILED = 'rooms/GET_ROOM_LIST_FAILED';

export const CREATE_ROOM = 'rooms/CREATE_ROOM';
export const CREATE_ROOM_SUCCESS = 'rooms/CREATE_ROOM_SUCCESS';
export const CREATE_ROOM_FAILED = 'rooms/CREATE_ROOM_FAILED';


//redux thunk
export const getRoomListThunk = createAsyncThunk(GET_ROOM_LIST, roomApi.getRoomList);

export const createRoomThunk = createAsyncThunk(CREATE_ROOM, roomApi.createRoom);

const initialState = {
    byId: {},
    allIds: []
}

//case reducer
function handleRoomList(state, action){
    switch(action.type){
        case GET_ROOM_LIST_SUCCESS:
            const rooms = action.payload;

            return {
                ...state,
               byId: rooms.reduce((obj, room) => {
                   const { id, number, name, seatCount } = room;
                   obj[id] = {
                       id,
                       number,
                       name,
                       seatCount
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

function handleRoom(state, action){
    switch(action.type){
        case CREATE_ROOM_SUCCESS:
            const { 
                id, 
                number, 
                name, 
                seatCount
            } = action.payload;

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id]: {
                        id,
                        number,
                        name,
                        seatCount
                    }
                },
                allIds: state.allIds.concat(id)
            }
        case CREATE_ROOM_FAILED:
            return {
                ...state
            };
    }
}

//slice reducer
export default function roomReducer(state = initialState, action){
    switch(action.type){
        case GET_ROOM_LIST_SUCCESS:
        case GET_ROOM_LIST_FAILED:
            return handleRoomList(state, action);
        case CREATE_ROOM_SUCCESS:
        case CREATE_ROOM_FAILED:
            return handleRoom(state, action);
        default:
            return state
    }
}

