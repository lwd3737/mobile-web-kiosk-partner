import React from 'react';
import styled, { css } from 'styled-components';

import { Head } from 'common/components';
import { RoomModifyContainer } from './containers';

export default function RoomModifyPage(){
    return (
        <S.RoomModifyPage>
            <Head
                title="공간 수정"
            >
            </Head>

            <RoomModifyContainer />
        </S.RoomModifyPage>
    )
}

const S = {
    RoomModifyPage: styled.div`
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