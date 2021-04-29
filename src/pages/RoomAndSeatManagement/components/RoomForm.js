import React, { useState } from "react";
import styled from "styled-components";

import { Form, FormField, SimpleButton } from "common/components";

export default function RoomForm({
  number,
  name,
  colSeatCount,
  rowSeatCount,
  rightBtnText,
  onInputsChange,
  onPrevBtnClick,
  onRightBtnClick,
}) {
  const renderFields = () => {
    const fields = [
      {
        labelText: "공간 번호",
        inputId: "room-number",
        inputType: "number",
        inputName: "number",
        value: number,
        onChange: onInputsChange,
      },
      {
        labelText: "공간 이름",
        inputId: "room-name",
        inputType: "text",
        inputName: "name",
        value: name,
        onChange: onInputsChange,
      },
      {
        labelText: "가로 좌석 수",
        inputId: "col-seat-count",
        inputType: "number",
        inputName: "colSeatCount",
        value: colSeatCount,
        onChange: onInputsChange,
      },
      {
        labelText: "세로 좌석 수",
        inputId: "row-seat-count",
        inputType: "number",
        inputName: "rowSeatCount",
        value: rowSeatCount,
        onChange: onInputsChange,
      },
    ];

    return fields.map((field) => <FormField key={field.inputId} {...field} />);
  };

  const renderBottom = () => {
    return (
      <>
        <SimpleButton
          className="prev-btn"
          backgroundColor={"gray1"}
          onClick={onPrevBtnClick}
        >
          이전
        </SimpleButton>
        <SimpleButton
          className="next-btn"
          extraStyle={{
            marginLeft: "20px",
          }}
          onClick={onRightBtnClick}
        >
          {rightBtnText}
        </SimpleButton>
      </>
    );
  };

  return <Form fields={renderFields()} bottom={renderBottom()} />;
}

const S = {
  RoomForm: styled.form`
    .field {
      margin-bottom: 5vh;
      font-size: 1.2rem;

      label {
        display: inline-block;
        width: 15vw;
      }

      input {
        width: 20vw;

        &[type="number"] {
          width: 10vw;
        }
      }
    }

    .btn-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-top: 12vh;

      .prev-btn {
      }

      .next-btn {
      }
    }
  `,
};
