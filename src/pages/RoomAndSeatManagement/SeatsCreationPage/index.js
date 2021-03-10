import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { Head, SimpleButton } from 'common/components';
import { SeatsCreationBoardContainer } from './containers';
import { SeatsInfo } from '../components';
import { CREATE_SEATS_FAILED, createSeatsThunk } from 'modules/seats';
import { useRoom, useSeats, useSeatsSerialization } from 'common/hooks';

export default function SeatsCreationPage(){
    const dispatch = useDispatch();
    const history = useHistory();

    const partner = useSelector(state => state.auth.partner);
    const { roomId } = useParams();
    const room = useRoom(partner.id, roomId);
    const { name, rowSeatCount, colSeatCount, seatCount } = room;
    const [seats, setSeats] = useSeats(rowSeatCount, colSeatCount);


    const renderContents = (room) => {
        if(!room) return null;

        const seatsInfo = [
            ['총 좌석 수', seatCount],
            ['가로 좌석 수(길이)', rowSeatCount],
            ['세로 좌석 수(길이)', colSeatCount],
        ];

        return (
            <>
                <SeatsCreationBoardContainer
                    seats={seats}
                    setSeats={setSeats}
                    rowSeatCount={rowSeatCount}
                    colSeatCount={colSeatCount}
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

    const handleMoveRoomModifyClick = () => {
        history.replace(`/partner/rooms/${roomId}/modify`);
    };

    const handleSeatsCreationClick = () => {
        const parseSeats = (seats) => {
            const parsed = [];

            seats.forEach(row => {
                row.forEach(seat => {
                    if(!seat) return;

                    const { number } = seat;
                    parsed.push({
                        number
                    });
                });
            });

            return parsed;
        };

        const successCb = () => {
            alert('좌석이 성공적으로 생성되었습니다.');
            history.replace(`/partner/rooms`);
        };

        const failedCb = (getState) => {
            const error = getState()
                .appStatus.errors.find(error => {
                    return error.type === CREATE_SEATS_FAILED;
                })
            alert(`좌석을 생성할 수 없습니다. \n${error}`);
        };

        dispatch(createSeatsThunk({ 
            partnerId: partner.id,
            roomId: room.id,
            seats: parseSeats(seats)
        }, {
            successCb,
            failedCb
        }));
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
                    onClick={handleMoveRoomModifyClick}
                >
                    공간 수정
                </SimpleButton>
                <SimpleButton
                    onClick={handleSeatsCreationClick}
                >
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