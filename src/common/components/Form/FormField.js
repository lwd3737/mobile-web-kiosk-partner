import React from "react";
import styled from "styled-components";

import { Dropdown } from "common/components";

function FormField({
  labelText,
  inputId,
  inputType,
  inputName,
  value,
  options,
  onChange,
}) {
  const renderInput = () => {
    if (inputType === "select") {
      const _value = value || (options.length > 0 && options[0].value) || null;

      return (
        <Dropdown
          inputId={inputId}
          inputName={inputName}
          value={value}
          options={options}
          onInputChange={onChange}
        />
      );
    } else {
      return (
        <input
          id={inputId}
          type={inputType}
          name={inputName}
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

export default FormField;

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
