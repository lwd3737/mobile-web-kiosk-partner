import React from 'react';
import styled, { css } from 'styled-components';

import { Card } from 'common/components';

export default function RoomList({ 
    rooms,
    onRoomMoveClick,
    onRoomModifyBtnClick,
    onRoomDeleteBtnClick
}){
    const renderRooms = (rooms) => {
        return rooms.map(room => {
            return <RoomItem 
                key={room.number}
                {...room}
                onRoomMoveClick={onRoomMoveClick}
                onRoomModifyBtnClick={onRoomModifyBtnClick}
                onRoomDeleteBtnClick={onRoomDeleteBtnClick}
            />
        })
    }

    return (
        <S.RoomList>
            {renderRooms(rooms)}
        </S.RoomList>
    )
}

function RoomItem({ 
    id, 
    number, 
    name,
    seatCount,
    hasSeats,
    seatCountInUse, 
    onRoomMoveClick,
    onRoomModifyBtnClick,
    onRoomDeleteBtnClick 
}){
    const renderSeatStatus = () => {
        if(hasSeats){
            console.log('status: ', seatCountInUse, seatCount)
            return (
                <>
                    <label>좌석 : </label>
                    <span className="seat-count-in-use">
                        {String(seatCountInUse)}
                    </span> /  
                    <span className="total-seat-count">
                        {seatCount}
                    </span>
                </>
            )
        } else {
            return (
                <span className="has-not-seats">
                    좌석을 생성해주세요.
                </span>
            )
        }
    }

    return (
        <Card
            style={{
                marginBottom: '7vw',
                marginRight: '3vw'
            }}
        >
            <S.RoomItem
                onClick={() => onRoomMoveClick(id)}
            >
                <div className="room-name">{name}</div>
                <div className="seat-status">
                    {renderSeatStatus()}
                </div>
                <div className="buttons">
                    <button className="edit"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRoomModifyBtnClick(id)
                        }}
                    >
                         수정
                    </button>
                    <button className="delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            onRoomDeleteBtnClick(id)
                        }}
                    >
                        삭제
                    </button>
                </div>
            </S.RoomItem>
        </Card>
    )
}

const S = {
    RoomList: styled.ul`
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        padding-left: 3vw;
    `,
    RoomItem: styled.div`
        width: 15vw;

        &:hover{
            cursor: pointer;
        }

        .room-name{
            margin-bottom: 15%;
        }

        .seat-status{
            margin-bottom: 15%;
            font-size: 0.7rem;

            .total-seat-count{
                font-weight: bold;
            }
        }

        .buttons{
            display: flex;
            justify-content: center;

            .edit{
                color: green;
            }

            .delete{
                color: red;
            }
        }
    `
}