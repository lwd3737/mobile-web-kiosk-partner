import React from 'react';
import styled from 'styled-components';
import { Switch, Route, useRouteMatch  } from 'react-router-dom';

import RoomListPage from './RoomListPage';
import RoomCreationPage from './RoomCreationPage';
import RoomModifyPage from './RoomModifyPage';
import SeatsCreationPage from './SeatsCreationPage';
import SeatsModifyPage from './SeatsModifyPage';

export default function RoomAndSeatManagement(){
    const { path } = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <RoomListPage 
                />
            </Route>
            <Route exact path={`${path}/creation`}>
                <RoomCreationPage 
                />
            </Route>
            <Route exact path={`${path}/:roomId/modify`}>
                <RoomModifyPage 
                />
            </Route>
            <Route exact path={`${path}/:roomId/seats`}>
                seats
            </Route>
            <Route exact path={`${path}/:roomId/seats/creation`}>
                <SeatsCreationPage
                />
            </Route>
            <Route exact path={`${path}/:roomId/seats/modify`}>
                <SeatsModifyPage
                />
            </Route>
        </Switch>
    )
}
