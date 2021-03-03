import React from 'react';
import styled, { css } from 'styled-components';

import Seat from './Seat';

export default function SeatsBoard({ room, seats = {}}){
    const { 
        colSeatCount, 
        rowSeatCount, 
    } = room;

    const renderSeats = () => {
        const renderRows = (rowCount) => {
            const rows = [];

            for(let i = 0; i < rowCount; i++){
                rows.push(
                    <S.Row key={i}>
                        {renderCols(colSeatCount)}
                    </S.Row>
                );
            }

            return rows;
        };

        const renderCols = (colCount) => {
            const cols = [];

            for(let i = 0; i < colCount; i++){
                cols.push(
                    <Seat 
                        key={i}
                        {...seats}
                    />
                )
            }

            return cols;
        };

        return renderRows(rowSeatCount);
    }

    return (
        <S.SeatsBoard>
            {renderSeats()}
        </S.SeatsBoard>
    )
}

const S = {
    SeatsBoard: styled.div`
        
    `,
    Row: styled.div`
        display: flex;
    `
}

