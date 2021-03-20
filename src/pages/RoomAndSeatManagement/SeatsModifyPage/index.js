import React from 'react';
import styled from 'styled-components';

import { Head } from 'common/components';
import { SeatsFormContainer } from 'pages/RoomAndSeatManagement/containers';
import { useFetchSeatsData } from 'common/hooks';

export default function SeatsModifyPage(){
    const seatsData = useFetchSeatsData({ status: 'modify' });
    
    if(!seatsData || seatsData.length === 0) return null;

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
    `
};