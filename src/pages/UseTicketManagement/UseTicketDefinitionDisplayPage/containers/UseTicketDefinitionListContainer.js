import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { UseTicketDefinitionList } from "../components";
import {
  GET_USETICKET_DEFINITIONS_FAILED,
  getUseTicketDefinitionsThunk,
} from "modules/usetickets";

function UseTicketDefinitionListContainer() {
  const dispatch = useDispatch();
  const partnerId = useSelector((state) => state.auth.partner.id);
  const definitionsSlice = useSelector((state) => state.usetickets.definitions);
  const definitions = definitionsSlice.allIds.map(
    (id) => definitionsSlice.byId[id]
  );

  useEffect(function loadDefinitions() {
    const failedCb = (getState) => {
      const error = getState().appStatus.errors.find(
        (error) => error.type === GET_USETICKET_DEFINITIONS_FAILED
      );
      window.alert(error.message);
    };

    dispatch(getUseTicketDefinitionsThunk({ partnerId }), {
      successCb: null,
      failedCb,
    });
  }, []);

  return <UseTicketDefinitionList definitions={definitions} />;
}

export default UseTicketDefinitionListContainer;
