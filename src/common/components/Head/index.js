import React from 'react';
import styled, { css } from 'styled-components';

export default function Head({ children, title }){
    return (
        <S.Head>
            <h2 className="title">
                {title}
            </h2>
            {children}
        </S.Head>
    )
}

const S = {
    Head: styled.div`
         ${({ theme }) => {
            const { font } = theme;

            return css`
                display: flex;
                justify-content: space-between;

                .title{
                    font-size: ${font.size.contentsTitle};
                    margin-bottom: 10vh;
                }
            `
        }}
    `
}