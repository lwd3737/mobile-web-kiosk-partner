import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RoomCreationForm } from '../components';
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setInputs({
            ...inputs,
            [name]: value
        });
    };

    const handleNextBtnClick = () => {
        const successCb = (getState) => {
            const { rooms } = getState();
            
            window.alert(`공간(${inputs.name})이 생성되었습니다.`);
            history.push()  
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
        <RoomCreationForm 
            {...inputs}
            onInputsChange={handleInputChange}
            onNextBtnClick={handleNextBtnClick}
        />
    );
}

