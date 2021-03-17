import React from 'react';
import styled from 'styled-components';

import { Head } from 'common/components';
import { SeatsFormContainer } from 'pages/RoomAndSeatManagement/containers';
import { useFetchSeats } from 'common/hooks';

export default function SeatsModifyPage(){
    const seatsData = useFetchSeats();

    if(!seatsData) return null;

    return (
        <S.SeatsModifyPage>
            <Head
                title="좌석 수정"
            />

            <SeatsFormContainer 
                type='modify'
                seatsData={seatsData}
            />
        </S.SeatsModifyPage>
    )
}

const S = {
    SeatsModifyPage: styled.div`
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