import React, { useState } from 'react';
import styled from 'styled-components';

import { SimpleButton } from 'common/components'

export default function RoomForm({ 
    number,
    name,
    colSeatCount,
    rowSeatCount,
    rightBtnText,
    onInputsChange,
    onPrevBtnClick,
    onRightBtnClick,
}){

    return (
        <S.RoomForm
            onSubmit={(e) => e.preventDefault()}
        >
            <div className="field">
                <label htmlFor="room-number">
                    공간 번호
                </label>
                <input id="room-number" 
                    type="number"
                    name="number"
                    value={number}
                    onChange={onInputsChange}
                />
            </div>
            <div className="field">
                <label htmlFor="room-name">
                    공간 이름
                </label>
                <input id="room-name" 
                    name="name"
                    value={name}
                    onChange={onInputsChange}
                />
            </div>
            <div className="field">
                <label htmlFor="col-seat-count">
                    가로 좌석 수
                </label>
                <input id="col-seat-count" 
                    type="number"
                    name="colSeatCount"
                    value={colSeatCount}
                    onChange={onInputsChange}
                />
            </div>
            <div className="field">
                <label htmlFor="row-seat-count">
                    세로 좌석 수
                </label>
                <input id="row-seat-count" 
                    type="number"
                    name="rowSeatCount"
                    value={rowSeatCount}
                    onChange={onInputsChange}
                />
            </div>

            <div className="btn-wrapper">
                <SimpleButton className="prev-btn"
                    backgroundColor={'gray1'}
                    onClick={onPrevBtnClick}
                >
                    이전
                </SimpleButton>
                <SimpleButton className="next-btn"
                    extraStyle={{
                        marginLeft: '20px'
                    }}
                    onClick={onRightBtnClick}
                >
                    {rightBtnText}
                </SimpleButton>
            </div>
        </S.RoomForm>
    )
}

const S = {
    RoomForm: styled.form`
        .field{
            margin-bottom: 5vh;
            font-size: 1.2rem;

            label{
                display: inline-block;
                width: 15vw;
            }

            input{
                width: 20vw;

                &[type=number]{
                    width: 5vw;
                }
            }
        }

        .btn-wrapper{
            display: flex;
            justify-content: flex-end;
            margin-top: 12vh;

            .prev-btn{

            }

            .next-btn{
            }
        }
    `
}