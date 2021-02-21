import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RoomList } from '../components';
import { getRoomListThunk } from 'modules/rooms';

export default function RoomListContainer(){
    const dispatch = useDispatch();
    const roomsSlice = useSelector(state => state.rooms);
    const roomsIds = roomsSlice.allIds;
    const rooms = roomsIds.map(id => roomsSlice.byId[id]);

    useEffect(() => {
        dispatch(getRoomListThunk());
    }, []);
    
    return <RoomList 
        rooms={rooms}
    />
}