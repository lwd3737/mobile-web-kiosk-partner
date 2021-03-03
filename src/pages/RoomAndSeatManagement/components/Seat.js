import React from 'react';
import styled, { css } from 'styled-components';

export default function Seat({ id, number, isAvailable }){

    return (
        <S.Seat>
            {number && (
                <div>{number}</div>
            )}

        </S.Seat>
    )
}

const S = {
    Seat: styled.div`
        width: 4vw;
        height: 4vw;
        margin: 1vw;
        border-radius: 10px;
        background: rgba(0,0,0,0.05);

        &:hover{
            border: 3px solid ${({ theme }) => theme.colors.green1};
        }
    `
}