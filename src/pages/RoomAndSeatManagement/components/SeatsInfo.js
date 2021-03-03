import React from 'react';
import styled, { css } from 'styled-components';

export default function SeatsInfo({ children, roomName, seatsInfo }){
    const renderSeatsInfo = () => {
        if(children) return children;

        return seatsInfo.map(info => (
            <div className="info">
                <label>
                    {info[0]}:
                </label>
                <span>
                    {info[1]}
                </span>
            </div>
        ));
    };

    return (
        <S.SeatsInfo>
            <h3 className="room-name">
                {roomName}
            </h3>

            <div className="infos">
                {renderSeatsInfo()}
            </div>
        </S.SeatsInfo>
    )
}

const S = {
    SeatsInfo: styled.div`
        width: 100%;
        padding: 10px 0  0 10vw;

        .room-name{
            font-size: 1.7rem;
            color: black;
        }

        .infos{
            width: 55%;
            margin-top: 5vh;
            font-size: 1.2rem;

            .info{
                display: flex;
                justify-content: space-between;
                margin-bottom: 3vh;

                label{
                    font-weight: bold;

                }
            }
        }
    `
}