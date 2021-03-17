import { createAsyncThunk } from 'common/utils/asyncUtils';
import * as seatsApi from 'api/seats';

const GET_SEAT_LIST = 'seats/GET_SEAT_LIST';
const GET_SEAT_LIST_SUCCESS = 'seats/GET_SEAT_LIST_SUCCESS';
export const GET_SEAT_LIST_FAILED = 'seats/GET_SEAT_LIST_FAILED';

const CREATE_SEATS = 'seats/CREATE_SEATS';
const CREATE_SEATS_SUCCESS = 'seats/CREATE_SEATS_SUCCESS';
export const CREATE_SEATS_FAILED = 'seats/CREATE_SEATS_FAILED';

const MODIFY_SEATS = 'seats/MODIFY_SEATS';
const MODIFY_SEATS_SUCCESS = 'seats/MODIFY_SEATS_SUCCESS';
export const MODIFY_SEATS_FAILED = 'seats/MODIFY_SEATS_FAILED';


export const getSeatList = createAsyncThunk(GET_SEAT_LIST, seatsApi.getSeats);

export const createSeatsThunk = createAsyncThunk(CREATE_SEATS, seatsApi.createSeats);

export const modifySeatsThunk = createAsyncThunk(MODIFY_SEATS, seatsApi.modifySeats);

const initialState = {
    byId: {},
    allIds: []
};

function handleSuccess(state, action){
    switch(action.type){
        case GET_SEAT_LIST_SUCCESS: {
            const seats = action.payload;
            return {
                byId: {
                    ...seats.reduce((obj, seat) => {
                        const {
                            id,
                            number,
                            isAvailable,
                            x,
                            y,
                            roomId,
                            useticketIdInUse
                        } = seat;

                        obj[id] = {
                            id,
                            number,
                            isAvailable,
                            x,
                            y,
                            roomId,
                            useticketIdInUse
                        }

                        return obj;
                    }, {})
                },
                allIds: seats.map(seat => parseInt(seat.id))
            }
        }
        case CREATE_SEATS_SUCCESS: 
        case MODIFY_SEATS_SUCCESS: {
            const seats = action.payload;

            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...seats.reduce((obj, seat) => {
                        obj[seat.id] = {
                            ...seat
                        }
                        return obj;
                    }, {})
                },
                allIds: state.allIds.concat(seats.map(seat => seat.id))
            };
        }

    }
}


export default function seatsReducer(state = initialState, action){
    switch(action.type){
        case GET_SEAT_LIST_SUCCESS:
        case CREATE_SEATS_SUCCESS:
        case MODIFY_SEATS_SUCCESS:
            return handleSuccess(state, action);
        default:
            return state;
    }
}