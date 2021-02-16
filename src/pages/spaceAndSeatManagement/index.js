import React from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import SpaceListPage from './SpaceListPage';
import SpaceCreationPage from './SpaceCreationPage';


export default function SpaceAndSeatManagement({ basePath }){

    return (
        <Switch>
            <Route exact path={`${basePath}`}>
                <SpaceListPage />
            </Route>
            <Route exact path={`${basePath}/creation`}>
                <SpaceCreationPage />
            </Route>
            <Route exact path={`${basePath}/:spacesId/seats/creation`}>

            </Route>
            <Route exact path={`${basePath}/:spaceId/seats`}>
                seats
            </Route>
        </Switch>
    )
}
