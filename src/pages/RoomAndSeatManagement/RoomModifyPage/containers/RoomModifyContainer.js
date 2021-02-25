import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RoomForm } from '../../components';
import { 
    MODIFY_ROOM_FAILED,
    getRoomFormThunk, 
    modifyRoomThunk,
} from 'modules/rooms';

export default function RoomModifyFormContainer(){
    const history = useHistory();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        number: null,
        name: '',
        colSeatCount: 0,
        rowSeatCount: 0,
    });

    const partner = useSelector(state => state.auth.partner);

    const { roomId } = useParams();
    const room = useSelector(state => state.rooms.byId[roomId]);
    useEffect(() => {
        dispatch(getRoomFormThunk({ partnerId: partner.id, roomId }));

        setInputs({
            ...room
        });
    }, []);


    const handleInputsChange = (e) => {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const handlePrevBtnClick = () => {
        history.replace('/partner/rooms');
    };

    const handleModifyBtnClick = () => {
        const successCb = (getState, payload) => {
            const { name } = payload;
 
            window.alert(`공간(${name})이 수정되었습니다.`);
        };

        const failedCb = (getState) => {
            const { appStatus } = getState();
            const error = appStatus.errors.find(error => 
                error.type === MODIFY_ROOM_FAILED);
            window.alert(error.message);
        }
        
        dispatch(modifyRoomThunk({
            ...inputs,
            partnerId: partner.id,
        }, {
            successCb,
            failedCb
        }));

    };
 
    return (
        <RoomForm
            {...inputs}
            rightBtnText="수정"
            onInputsChange={handleInputsChange}
            onPrevBtnClick={handlePrevBtnClick}
            onRightBtnClick={handleModifyBtnClick}
       />
    );
}

