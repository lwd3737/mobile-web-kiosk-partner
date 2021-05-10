import React from "react";
import styled from "styled-components";

import { List } from "common/components";
import UseTicketDefinitionItem from "./UseTicketDefinitionItem";

function UseTicketDefinitionList({ definitions }) {
  return (
    <List data={definitions} ItemInnerComponent={UseTicketDefinitionItem} />
  );
}

export default UseTicketDefinitionList;

const S = {};
