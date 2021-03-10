import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRoomThunk } from 'modules/rooms';

export default function useRoom(partnerId, roomId){
    const dispatch = useDispatch();
    
    const room = useSelector(state => state.rooms.byId[roomId]) || {};
    useEffect(() => {
        dispatch(getRoomThunk({
            partnerId,
            roomId
        }));
    }, []);

    return room;
}