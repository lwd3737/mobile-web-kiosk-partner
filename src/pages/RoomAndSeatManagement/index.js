import React from 'react';
import styled from 'styled-components';
import { Switch, Route, useRouteMatch  } from 'react-router-dom';

import RoomListPage from './RoomListPage';
import RoomCreationPage from './RoomCreationPage';


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
            <Route exact path={`${path}/:roomId/seats/creation`}>

            </Route>
            <Route exact path={`${path}/:roomId/seats`}>
                seats
            </Route>
        </Switch>
    )
}
