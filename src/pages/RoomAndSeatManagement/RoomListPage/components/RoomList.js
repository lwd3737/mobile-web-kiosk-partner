import React from 'react';
import styled, { css } from 'styled-components';

import { Card } from 'common/components';

export default function RoomList({ rooms }){
    const renderRooms = (rooms) => {
        return rooms.map(room => {
            return <RoomItem 
                key={room.number}
                {...room}
            />
        })
    }

    return (
        <S.RoomList>
            {renderRooms(rooms)}
        </S.RoomList>
    )
}

function RoomItem({ id, number, name ,seatCount }){
    return (
        <Card
            style={{
                marginBottom: '7vw'
            }}
        >
            <S.RoomItem>
                <div className="room-name">{name}</div>
                <div className="seat-status">
                    <span></span> /  
                    <span className="total-seat-count">
                        {seatCount}
                    </span>
                </div>
                <div className="buttons">
                    <button className="edit">수정</button>
                    <button className="delete">삭제</button>
                </div>
            </S.RoomItem>
        </Card>
    )
}

const S = {
    RoomList: styled.ul`
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    `,
    RoomItem: styled.div`
        width: 15vw;    

        .room-name{
            margin-bottom: 15%;
        }

        .seat-status{
            margin-bottom: 15%;

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