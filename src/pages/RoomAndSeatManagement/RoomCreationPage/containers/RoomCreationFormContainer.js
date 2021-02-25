import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RoomForm } from '../../components';
import { CREATE_ROOM_FAILED, createRoomThunk } from 'modules/rooms';

export default function RoomCreationFormContainer(){
    const history = useHistory();
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        number: null,
        name: '',
        colSeatCount: 0,
        rowSeatCount: 0,
    });
    const partner = useSelector(state => state.auth.partner);

    const handleInputsChange = (e) => {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const handlePrevBtnClick = () => {
        history.replace('/partner/rooms');
    }

    const handleNextBtnClick = () => {
        const successCb = (getState, payload) => {
            const { id, name } = payload;
            
            window.alert(`공간(${name})이 생성되었습니다.`);
            history.push(`/partner/rooms/${id}/seats/creation`);  
        };
        
        const failedCb = (getState) => {
            const { appStatus } = getState();
            const error = appStatus.errors.find(error => 
                error.type === CREATE_ROOM_FAILED);
            window.alert(error.message);
        }
        
        dispatch(createRoomThunk({
            ...inputs,
            partnerId: partner.id
        }, 
        {
            successCb,
            failedCb
        }));

    };

    return (
        <RoomForm
            {...inputs}
            rightBtnText="다음"
            onInputsChange={handleInputsChange}
            onPrevBtnClick={handlePrevBtnClick}
            onRightBtnClick={handleNextBtnClick}
       />
    );
}

