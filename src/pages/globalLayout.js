import React from 'react';
import styled, { css } from 'styled-components';
import {
    Switch,
    Route,
    NavLink,
    useHistory 
} from 'react-router-dom';
import { useSelector } from 'react-redux';
  
import RoomAndSeatManagement from './RoomAndSeatManagement';
import LoginPage from 'pages/Auth/LoginPage';

export default function GlobalLayout(){
    const history = useHistory();
    const { serviceName } = useSelector(state => state.auth.partner);
    const basePath = `/partner`;

    const isLogin = useSelector(state => state.auth.isLogin);

    if(!isLogin){
        history.replace(`${basePath}/auth/login`);
    }

    return (
        <S.GlobalLayout>
            {isLogin && (
                <header className="global-header">
                    <div className="partner-logo">
                        {serviceName}
                    </div>
                    <NavLink className="nav-item" to={basePath}>
                        홈
                    </NavLink>
                    <NavLink className="nav-item" to={`${basePath}/users`}>
                        회원 관리
                    </NavLink>
                    <NavLink className="nav-item" to={`${basePath}/rooms`}>
                        공간/좌석 관리
                    </NavLink>
                </header>
            )}
            
            <Switch>
                <main className="contents">
                    <Route exact path={`${basePath}/auth/login`}>
                        <LoginPage />
                    </Route>
                    <Route exact path={basePath}>
                        home
                    </Route>
                    <Route path={`${basePath}/users`}>
                        users management
                    </Route>
                    <Route path={`${basePath}/rooms`}>
                        <RoomAndSeatManagement 
                            basePath={`${basePath}/rooms`}
                        />
                    </Route>
                </main>
            </Switch>
        </S.GlobalLayout>
    )
}

const S = {
    GlobalLayout: styled.div`
        display: flex;
        height: 100vh;

        .global-header{
            width: 20vw;
            min-width: 130px;
            padding: 3% 3%;
            border-right: 1px solid rgba(0,0,0,0.1);

            .partner-logo{
                font-size: 25px;
                font-weight: bold;
                margin-bottom: 10vh;
            }

            .nav-item{
                display: block;
                margin: 4.5vh 0;
                font-size: 20px;
            }
        }

        .contents{
            width: 100%;
            height: 100%;
            padding: 3% 6%;
        }
    `
}

