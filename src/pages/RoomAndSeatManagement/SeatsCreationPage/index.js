import React from 'react';
import styled from 'styled-components';

import { Head } from 'common/components';
import { SeatsFormContainer } from 'pages/RoomAndSeatManagement/containers';

export default function SeatsCreationPage(){
    
    return (
        <S.SeatsCreationPage>
            <Head
                title="좌석 생성"
            />

            <SeatsFormContainer 
                type={'create'}
            />
        </S.SeatsCreationPage>
    )
}

const S = {
    SeatsCreationPage: styled.div`
        .board{
            display: flex;
            margin-bottom: 100px;
            padding: 0 !important;
        }

        .btn-wrapper{
            display: flex;
            justify-content: flex-end;

            & > *{
                margin-right: 1.5vw;
            }
        }
    `
}