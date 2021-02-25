import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { RoomList } from '../components';
import { DELETE_ROOM_FAILED, getRoomListThunk, deleteRoomThunk } from 'modules/rooms';

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

    const handleRoomDeleteBtnClick = (id) => {
        console.log('rooms: ', rooms);
        const room = roomsSlice.byId[id];

        const flag = window.confirm(`정말 ${room.name}을 삭제하시겠습니까?`);

        if(flag){
            const successCb = () => {
                window.alert(`${room.name}이 삭제되었습니다.`);
            };

            const failedCb = (getState) => {
                const { appStatus } = getState();
                const error = appStatus.errors.find(error => 
                    error.type === DELETE_ROOM_FAILED    
                );
                window.alert(error.message);
            };

            dispatch(deleteRoomThunk({ 
                id,
                partnerId: partner.id
            },{
                successCb,
                failedCb
            }));
        }
    };

    return <RoomList 
        rooms={rooms}
        onRoomModifyBtnClick={handleRoomModifyBtnClick}
        onRoomDeleteBtnClick={handleRoomDeleteBtnClick}
    />
}