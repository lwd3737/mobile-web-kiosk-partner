import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRoomThunk } from 'modules/rooms';

export default function useRoom(){
    const dispatch = useDispatch();
    const partner = useSelector(state => state.auth.partner);
    const { roomId } = useParams();
    const room = useSelector(state => state.rooms.byId[roomId]) || {};

    useEffect(() => {
        dispatch(getRoomThunk({
            partnerId: partner.id,
            roomId
        }));
    }, []);

    return room;
}