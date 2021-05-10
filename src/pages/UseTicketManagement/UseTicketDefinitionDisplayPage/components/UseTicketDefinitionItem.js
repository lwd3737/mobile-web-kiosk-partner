import React from "react";
import styled, { css } from "styled-components";

import { SimpleButton } from "common/components";

function UseTicketDefinitionItem({ id, name, periodUnit, period, price }) {
  return (
    <S.UseTicketDefinitionItem>
      <div className="left">
        <div className="name">
          {name ? (
            <span>{name}</span>
          ) : (
            <small>이용권 종류를 선택해주세요</small>
          )}
        </div>
        <div className="period">
          {period}
          {periodUnit}
        </div>
        <div className="price">{price}원</div>
      </div>
      <div className="right">
        <SimpleButton extraStyle={editButtonStyle}>수정</SimpleButton>
        <SimpleButton extraStyle={deleteButtonStyle}>삭제</SimpleButton>
      </div>
    </S.UseTicketDefinitionItem>
  );
}

export default UseTicketDefinitionItem;

const buttonStyle = {
  background: "white",
  width: "43px",
  height: "30px",
  padding: "0px",
  fontSize: "0.3rem",
};

const editButtonStyle = {
  ...buttonStyle,
  border: "1px solid hsl(242deg 88% 56% / 51%)",
  color: "hsl(242deg 88% 56% / 51%)",
};

const deleteButtonStyle = {
  ...buttonStyle,
  border: "1px solid red",
  color: "red",
};

const tagStyle = css`
  padding: 5px;
  font-size: 0.8rem;
  border-radius: 8px;
`;

const S = {
  UseTicketDefinitionItem: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;

      .name {
        margin-right: 15px;
        font-size: 1.1rem;

        span {
          display: inline-block;
          padding-top: 0.2rem;
        }

        small {
          font-size: 0.4rem;
          color: rgba(0, 0, 0, 0.1);
        }
      }

      .period {
        background: hsl(180deg 51% 52%);
        color: white;
        margin-right: 10px;
        ${tagStyle};
      }

      .price {
        background: ${({ theme }) => theme.colors.gray1};
        ${tagStyle};
      }
    }

    .right {
      display: flex;
      justify-content: space-around;
      width: 18%;
    }
  `,
};
