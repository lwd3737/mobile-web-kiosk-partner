import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import UseTicketDefinitionDisplayPage from "./UseTicketDefinitionDisplayPage";
import UseTicketDefinitionCreationPage from "./UseTicketDefinitionCreationPage";

function UseTicketManagement() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <UseTicketDefinitionDisplayPage />
      </Route>
      <Route exact path={`${path}/creation`}>
        <UseTicketDefinitionCreationPage />
      </Route>
      <Route exact path={`${path}/:definitionId/modification`}>
        <UseTicketDefinitionCreationPage />
      </Route>
    </Switch>
  );
}

export default UseTicketManagement;
