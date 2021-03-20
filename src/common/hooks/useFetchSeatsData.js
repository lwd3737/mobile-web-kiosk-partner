import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getSeatList, GET_SEAT_LIST_FAILED } from 'modules/seats';

export default function useFetchSeatsData(seatDataToAdd){
    const dispatch = useDispatch();
    const partnerId = useSelector(state => state.auth.partner.id);
    const { roomId } = useParams();
    const seatsById = useSelector(state => state.seats.byId);
    const [seatsData, setSeatsData] = useState([]);

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
    
    useEffect(() => {
        const _seatsData = [];

        for(let id in seatsById){
            if(seatsById[id].roomId != roomId) return ;

            const data = {
                ...seatsById[id],
                ...seatDataToAdd
            };
            _seatsData.push(data);
        }
    
        setSeatsData(_seatsData);
    }, [seatsById]);
    
    return seatsData;
}