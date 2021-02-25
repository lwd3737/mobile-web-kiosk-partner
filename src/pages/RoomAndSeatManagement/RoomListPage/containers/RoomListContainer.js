import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { RoomList } from '../components';
import { getRoomListThunk } from 'modules/rooms';

export default function RoomListContainer(){
    const dispatch = useDispatch();
    const history = useHistory();
    const { url } = useRouteMatch();

    const partner = useSelector(state => state.auth.partner);
    const roomsSlice = useSelector(state => state.rooms);
    const roomsIds = roomsSlice.allIds;
    const rooms = roomsIds.map(id => roomsSlice.byId[id]);
    useEffect(() => {
        dispatch(getRoomListThunk(partner.id));
    }, [partner]);
    
    const handleRoomModifyBtnClick = (roomId) => {
        history.push(`${url}/${roomId}/modify`);
    }

    return <RoomList 
        rooms={rooms}
        onRoomModifyBtnClick={handleRoomModifyBtnClick}
    />
}