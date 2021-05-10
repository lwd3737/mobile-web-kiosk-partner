import React from "react";
import styled, { css } from "styled-components";

function ListItem({ children }) {
  return <S.ListItem>{children}</S.ListItem>;
}

export default ListItem;

const S = {
  ListItem: styled.li`
    ${({ theme }) => {
      const { border, borderRadius } = theme.border.default;

      return css`
        border: ${border};
        border-radius: ${borderRadius};
        padding: 10px 20px;
        margin-bottom: 30px;
      `;
    }}
  `,
};
