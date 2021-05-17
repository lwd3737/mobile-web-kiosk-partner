import React from "react";

import { List } from "common/components";
import UseTicketDefinitionItem from "./UseTicketDefinitionItem";

function UseTicketDefinitionList({ definitions }) {
  return (
    <List data={definitions} ItemInnerComponent={UseTicketDefinitionItem} />
  );
}

export default UseTicketDefinitionList;
