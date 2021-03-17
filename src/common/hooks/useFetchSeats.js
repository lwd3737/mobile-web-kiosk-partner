import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getSeatList, GET_SEAT_LIST_FAILED } from 'modules/seats';

export default function useFetchSeats(partnerId, roomId){
    const dispatch = useDispatch();
    const seatsSlice = useSelector(state => state.seats);

    useEffect(() => {
        const failedCb = (getState) => {
            const error = getState()
                .appStatus.errors.find(error => {
                    return error.type === GET_SEAT_LIST_FAILED;
                });
            alert(`좌석을 불러올 수 없습니다.\n${error.errorMessage}`)
        };

        dispatch(getSeatList({ partnerId, roomId }, {
            failedCb
        }));
    }, []);

    const seatsData = [];
    for(let id in seatsSlice.byId){
        seatsData.push({ ...seatsSlice.byId[id]});
    }
    
    return seatsData;
}