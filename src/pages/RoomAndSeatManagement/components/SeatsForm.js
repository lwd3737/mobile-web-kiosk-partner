import React from 'react';
import styled from 'styled-components';

import { SimpleButton } from 'common/components';
import SeatsBoard from './SeatsBoard';
import SeatsInfo from './SeatsInfo';

export default function SeatsForm({ 
    seats,
    data,
    boardHandlers,
    roomName,
    seatsInfo,
    handleMoveRoomListClick,
    handleMoveRoomModifyClick,
    nextBtnText,
    handleNextClick
 }){
    return (
        <S.SeatsForm>
            <div className="control">
                <SeatsBoard
                    seats={seats}
                    data={data}
                    handlers={boardHandlers}
                />
                <SeatsInfo 
                    roomName={roomName}
                    seatsInfo={seatsInfo}
                />
            </div>

            <div className="btn-wrapper">
                <SimpleButton
                    backgroundColor='gray1'
                    onClick={handleMoveRoomListClick}
                >
                    목록
                </SimpleButton>
                <SimpleButton
                    backgroundColor='blue1'
                    onClick={handleMoveRoomModifyClick}
                >
                    공간 수정
                </SimpleButton>
                <SimpleButton
                    onClick={handleNextClick}
                >
                    {nextBtnText}
                </SimpleButton>
            </div>
        </S.SeatsForm>
    )
}

const S = {
    SeatsForm: styled.div`
        .control{
            display: flex;

            .board{
                display: flex;
                margin-bottom: 100px;
                padding: 0 !important;
            }

        }
        
        .btn-wrapper{
            display: flex;
            justify-content: flex-end;
            margin-top: 10vh;
            & > *{
                margin-right: 1.5vw;
            }
        }
    `
}