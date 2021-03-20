import React from 'react';
import styled from 'styled-components';

import { Head } from 'common/components';
import { SeatsDisplayContainer } from './containers';

export default function SeatsDisplayPage(){
   
    return (
        <S.SeatsDisplayPage>
            <Head
                title="좌석 보기"
            />

            <SeatsDisplayContainer />
        </S.SeatsDisplayPage>
    )
}

const S = {
    SeatsDisplayPage: styled.div`
    `
}