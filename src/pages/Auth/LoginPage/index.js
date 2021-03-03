import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { REQUEST_LOGIN_FAILED, requestLoginThunk } from 'modules/auth';

export default function LoginPage(){
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLoginClick = () => {
        const successCb = () => {
            history.push('/partner');
        };

        const failedCb = (getState) => {
            const { errors } = getState().appStatus;
            const error = errors.find(error => error.type === REQUEST_LOGIN_FAILED);
            window.alert('로그인이 실패했습니다: ', error.message);
        }

        dispatch(requestLoginThunk(1, {
            successCb,
            failedCb
        }));
    }

    return (
        <S.LoginPage>
            <button 
              onClick={handleLoginClick}
            >
              로그인
            </button>
        </S.LoginPage>
    )
}

const S = {
    LoginPage: styled.div``
}
