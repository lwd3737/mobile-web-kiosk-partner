import React from 'react';
import styled, { css } from 'styled-components';

import { Head } from 'common/components';
import { RoomCreationFormContainer } from './containers';

export default function RoomCreationPage(){
    return (
        <S.RoomCreationPage>
            <Head
                title="공간 생성"
            >
            </Head>

            <RoomCreationFormContainer />
        </S.RoomCreationPage>
    )
}

const S = {
    RoomCreationPage: styled.div`
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