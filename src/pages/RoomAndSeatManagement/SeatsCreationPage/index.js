import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { Head, SimpleButton } from 'common/components';
import { SeatsCreationBoardContainer } from './containers';
import { SeatsInfo } from '../components';
import { getRoomThunk } from 'modules/rooms';

export default function SeatsCreationPage(){
    const dispatch = useDispatch();
    const history = useHistory();

    const { roomId } = useParams();
    const room = useSelector(state => state.rooms.byId[roomId]);
    const partner = useSelector(state => state.auth.partner);
    useEffect(() => {
        dispatch(getRoomThunk({
            partnerId: partner.id, 
            roomId
        }));
    }, []);

    const useSeats = useState({});

    const renderContents = (room) => {
        if(!room) return null;

        const { 
            name, 
            colSeatCount, 
            rowSeatCount, 
            seatCount 
        } = room;
        const seatsInfo = [
            ['총 좌석 수', seatCount],
            ['가로 좌석 수(길이)', rowSeatCount],
            ['세로 좌석 수(길이)', colSeatCount],
        ];

        return (
            <>
                <SeatsCreationBoardContainer 
                    room={room}
                    useSeats={useSeats}
                />
                <SeatsInfo 
                    roomName={name}
                    seatsInfo={seatsInfo}
                />
            </>
        )
    };

    const handleMoveRoomListClick = () => {
        history.replace('/partner/rooms');
    };

    const handleMoveRoomCreationClick = () => {
        history.replace(`/partner/rooms/${roomId}/modify`);
    };

    const handleSeatsCreationClick = () => {
;
    };

    return (
        <S.SeatsCreationPage>
            <Head
                title="좌석 생성"
            />

            <div className="contents">
                {renderContents(room)}
            </div>

            <div className="btn-wrapper">
                <SimpleButton
                    backgroundColor='gray1'
                    onClick={handleMoveRoomListClick}
                >
                    목록
                </SimpleButton>
                <SimpleButton
                    backgroundColor='blue1'
                    onClick={handleMoveRoomCreationClick}
                >
                    공간 수정
                </SimpleButton>
                <SimpleButton>
                    좌석 생성
                </SimpleButton>
            </div>
        </S.SeatsCreationPage>
    )
}

const S = {
    SeatsCreationPage: styled.div`
        .contents{
            display: flex;
            margin-bottom: 100px;
            padding: 0 !important;
        }

        .btn-wrapper{
            display: flex;
            justify-content: flex-end;

            & > *{
                margin-right: 1.5vw;
            }
        }
    `
}