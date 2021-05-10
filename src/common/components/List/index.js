import React from "react";
import styled from "styled-components";

import ListItem from "./ListItem";

function List({ data, ItemInnerComponent }) {
  return (
    <S.List>
      {data.map((item, i) => (
        <ListItem key={item.id || i}>
          <ItemInnerComponent {...item} />
        </ListItem>
      ))}
    </S.List>
  );
}

export default List;

const S = {
  List: styled.ul``,
};
