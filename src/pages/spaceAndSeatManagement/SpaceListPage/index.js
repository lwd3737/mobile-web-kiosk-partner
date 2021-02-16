import React from 'react';
import styled, { css } from 'styled-components';

export default function SpaceListPage(){
    return (
        <S.SpaceListPage>
            <div className="head">
                <h2 className="title">
                    공간 관리
                </h2>
            </div>
        </S.SpaceListPage>
    )
}

const S = {
    SpaceListPage: styled.div`
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