import React from 'react';
import styled, { css } from 'styled-components';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { RoomListContainer } from './containers';
import { Head } from 'common/components';

export default function RoomListPage(){
    const history = useHistory();
    const { url } = useRouteMatch(); 

    const handleRoomCreationMoveClick = () => {
        history.push(`${url}/creation`);
    };

    return (
        <S.RoomListPage>
            <Head 
                title="공간 관리"
            >
                <div className="room-creation"
                    onClick={handleRoomCreationMoveClick}
                >
                    <button>+</button>
                    <span>공간 생성</span>
                </div>
            </Head>

            <RoomListContainer />
        </S.RoomListPage>
    )
}

const S = {
    RoomListPage: styled.div`
        .room-creation{
            background: ${({ theme }) => theme.colors.green1};
            height: fit-content;
            padding: 5px 15px 5px 5px;
            border-radius: 20px;

            &:hover{
                cursor:pointer;
            }

            button{
                font-size:20px;
                color: white;
            }

            span{
                color:white;
            }
        }
    `
};    