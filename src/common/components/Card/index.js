import React from 'react';
import styled, { css } from 'styled-components';

export default function Card({ children, style }){
    return (
        <S.Card
            style={style}
        >
            {children}
        </S.Card>
    )
}

const S = {
    Card: styled.div`
        ${({ theme }) => {
            const { boxShadow } = theme;
            
            return css`
                border: 1px solid rgba(0,0,0,0.1);
                border-radius: 10px;
                padding: 4% 3%;
                box-shadow: 0px 0px 8px 3px rgba(0,0,0,0.05);
                text-align: center;
            `
        }}
    `
}