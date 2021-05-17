import React from "react";
import styled from "styled-components";

import { Dropdown } from "common/components";

function FormField({
  labelText,
  inputId,
  inputType,
  name,
  value,
  options,
  defaultOption,
  onChange,
  extraHandlers,
}) {
  const renderInput = () => {
    if (inputType === "select") {
      const _value = value || defaultOption || null;

      return (
        <Dropdown
          name={name}
          value={_value}
          options={options}
          defaultOption={defaultOption}
          onChange={onChange}
          extraHandlers={extraHandlers}
        />
      );
    } else {
      return (
        <input
          id={inputId}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
        />
      );
    }
  };

  return (
    <S.FormField>
      <label htmlFor={inputId}>{labelText}</label>
      {renderInput()}
    </S.FormField>
  );
}

export default React.memo(FormField);

const S = {
  FormField: styled.div`
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
  `,
};
