import React from 'react';
import styled, { css } from 'styled-components';

export const SimpleButton = ({ children, backgroundColor, extraStyle, onClick }) => {
    return (
        <S.SimpleButton
            backgroundColor={backgroundColor}
            style={extraStyle}
            onClick={onClick}
        >
            {children}
        </S.SimpleButton>
    )
}


const S = {
    SimpleButton: styled.button`
        ${({ theme, backgroundColor }) => {
            return css`
                display: inline-block;
                background-color: ${backgroundColor 
                    ? theme.colors[backgroundColor] 
                    : theme.colors.green1};
                border-radius: 20px;
                color: white;
                padding: 10px 30px;
                font-size: 1.2rem;
            `
        }}
    `,
}