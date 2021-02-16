import React from 'react';
import styled, { css } from 'styled-components';

export default function SpaceCreationPage(){
    return (
        <S.SpaceCreationPage>
            <div className="head">
                <h2 className="title">공간 관리</h2>
            </div>
        </S.SpaceCreationPage>
    )
}

const S = {
    SpaceCreationPage: styled.div`
        ${({ theme }) => {
            const { font } = theme;

            return css`
                .head{
                    .title{
                        font-size: ${font.size.contentsTitle};
                    }
                }
            `
        }}
    `
}