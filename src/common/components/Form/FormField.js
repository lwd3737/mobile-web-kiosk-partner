import React from "react";
import styled from "styled-components";

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
      const _value = value || (options[0] && options[0][1]) || null;

      return (
        <select name={inputName} value={_value} onChange={onChange}>
          {options.map((option) => (
            <option value={option[1]}>{option[0]}</option>
          ))}
        </select>
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

    select {
      width: 13vw;
      font-size: inherit;
      option {
        text-align: center;
      }
    }
  `,
};
