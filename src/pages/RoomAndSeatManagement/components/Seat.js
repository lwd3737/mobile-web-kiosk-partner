import React from "react";
import styled, { css } from "styled-components";

export default function Seat({
  x,
  y,
  id,
  number,
  isAvailable,
  status,
  handlers,
  defaultBgColor,
}) {
  const bindHandlers = () => {
    const _handlers = {
      onClick: null,
      onMouseEnter: null,
    };
    const { handleSeatSelect, handleSeatSelectDrag } = handlers || {};

    if (handleSeatSelect) {
      _handlers.onClick = (e) => handleSeatSelect(e, x, y);
      _handlers.onMouseDown = (e) => handleSeatSelect(e, x, y);
    }
    if (handleSeatSelectDrag) {
      _handlers.onMouseEnter = (e) => handleSeatSelectDrag(e, x, y);
    }

    return _handlers;
  };

  return (
    <S.Seat
      isAvailable={isAvailable}
      status={status}
      defaultBgColor={defaultBgColor || "rgba(0,0,0,0.05)"}
      {...bindHandlers()}
    >
      {number && <div className="number">{number}</div>}
      {(status === "create" || status === "modify") && (
        <div
          className="cancel"
          onClick={(e) => handlers.handleSeatCancelClick(e, x, y, number)}
        >
          X
        </div>
      )}
    </S.Seat>
  );
}

const S = {
  Seat: styled.div`
    ${({ theme, status, isAvailable, defaultBgColor }) => {
      const { colors } = theme;
      let backgroundColor;

      if (status === "create" || status === "modify") {
        backgroundColor = colors.green1;
      } else if (status === "display") {
        backgroundColor = isAvailable ? "rgba(0,0,0,0.1)" : "#ea2a289c";
      }

      return css`
        width: 2.6rem;
        height: 2.6rem;
        min-width: 45px;
        min-height: 45px;
        margin: 0.8rem;
        border-radius: 10px;
        background: ${backgroundColor || defaultBgColor};
        text-align: center;

        &:hover {
          border: 3px solid ${colors.green1};
          cursor: pointer;
        }

        .number {
          padding-top: 12%;
          margin-bottom: 5%;
          font-weight: bold;
          color: white;
        }

        .cancel {
          color: #ff000038;
          font-weight: bold;

          &:hover {
            color: red;
          }
        }
      `;
    }}
  `,
};
