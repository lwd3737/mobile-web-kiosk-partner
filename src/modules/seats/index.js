import { createAsyncThunk } from 'common/utils/asyncUtils';
import * as seatsApi from 'api/seats';

const GET_SEAT_LIST = 'seats/GET_SEAT_LIST';
const GET_SEAT_LIST_SUCCESS = 'seats/GET_SEAT_LIST_SUCCESS';
const GET_SEAT_LIST_FAILED = 'seats/GET_SEAT_LIST_FAILED';

const CREATE_SEATS = 'seats/CREATE_SEATS';
const CREATE_SEATS_SUCCESS = 'seats/CREATE_SEATS_SUCCESS';
export const CREATE_SEATS_FAILED = 'seats/CREATE_SEATS_FAILED';

export const createSeatsThunk = createAsyncThunk(CREATE_SEATS, seatsApi.createSeats);

const initialState = {
    byId: {},
    allIds: []
};

function handleSuccess(state, action){
    switch(action.type){
        case CREATE_SEATS_SUCCESS: {
            const seats = action.payload;

            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...seats.reduce((obj, seat) => {
                        obj[seat.id] = {
                            ...seat
                        }
                        console.log('obj: ', obj);
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
        case CREATE_SEATS_SUCCESS:
            return handleSuccess(state, action);
        default:
            return state;
    }
}