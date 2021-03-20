import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { SeatsDetail } from '../../components';
import { useSeats, useRoom, useFetchSeatsData } from 'common/hooks';

export default function SeatsDisplayContainer(){
    const history = useHistory();

    const room = useRoom();
    const { name , rowSeatCount, colSeatCount, seatCount } = room;
    const seatsData = useFetchSeatsData({ status: 'display' });
    const [seats, setSeats] = useSeats(rowSeatCount, colSeatCount, seatsData);
    
    const countAvailableSeat = (seatsData) => {
        return seatsData.reduce((count, seat) => {
            if(!seat.isAvailable){
                count++;
            }
            return count;
        }, 0);
    };
    
    const seatsInfo = [
        { label: '총 좌석 수', value: seatCount },
        { label: '이용 중인 좌석 수', value: countAvailableSeat(seatsData)},
    ];

    const handleMoveRoomListClick = () => {
        history.replace('/partner/rooms');
    };

    const handleMoveRoomModifyClick = () => {
        history.replace(`/partner/rooms/${room.id}/modify`);
    };

    const handleMoveSeatsModifyClick = () => {
        history.replace(`/partner/rooms/${room.id}/seats/modify`);
    }

    return <SeatsDetail 
        seats={seats}
        roomName={name}
        seatsInfo={seatsInfo}
        handleMoveRoomListClick={handleMoveRoomListClick}
        handleMoveRoomModifyClick={handleMoveRoomModifyClick}
        nextBtnText='좌석 수정'
        handleNextClick={handleMoveSeatsModifyClick}
        seatDefaultBgColor='white'
    />
}