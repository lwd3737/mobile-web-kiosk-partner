import React from 'react';
import styled from 'styled-components';

import Seat from './Seat';

export default function SeatsBoard({ seats, data = {}, handlers }){
    const { startNumber } = data;
    
    const renderSeats = () => {
        return (
            <div className="handlers-area"
                {...handlers.board}
            >
                {seats.map((row, y) => {
                    const cols = row.map((seat, x) => <Seat 
                        key={`${x},${y}`}
                        x={x}
                        y={y}
                        {...seat}
                        handlers={handlers.seat}
                    />)

                    return (
                        <div className="row">
                            {cols}
                        </div>
                    )
                })}
            </div>
        ) 
    };

    
    return (
        <S.SeatsBoard>
            {startNumber && (
                <div className="number-display">
                    {startNumber} 번 부터 시작
                </div>
            )}
            <div className="seats">
                {renderSeats()}
            </div>
        </S.SeatsBoard>
    )
}

const S = {
    SeatsBoard: styled.div`
        width: 70vw;
        max-height: 70vh;
        overflow: auto;

        .number-display{
            padding: 10px;
            margin-bottom: 3vh;
        }

        .row{
            display: flex;
        }
    `,
}

