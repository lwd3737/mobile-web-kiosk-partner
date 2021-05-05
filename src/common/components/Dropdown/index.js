import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

function Dropdown({ inputId, inputName, value, options, onInputChange }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOptionsClick = (e) => {
    e.stopPropagation();

    setIsOpen(!isOpen);
  };

  const handleSelectOption = (e, option) => {
    e.stopPropagation();

    setSelectedOption(option);
    handleToggleOptionsClick(e);
  };

  useEffect(
    function initializeSelected() {
      if (!options || !options.length === 0) return;
      setSelectedOption(options[0]);
    },
    [value]
  );

  return (
    <S.Dropdown isOpen={isOpen}>
      <input
        type="hidden"
        id={inputId}
        name={inputName}
        value={selectedOption?.value}
        onChange={onInputChange}
      />
      <div className="selected" onClick={(e) => handleToggleOptionsClick(e)}>
        <span className="label">{selectedOption?.label}</span>
        <span className="icon">{isOpen ? "▲" : "▼"}</span>
      </div>
      <ul className="options">
        {isOpen &&
          options.map((option, i) => (
            <li
              key={i}
              className="option"
              onClick={(e) => handleSelectOption(e, option)}
            >
              {option.label}
            </li>
          ))}
      </ul>
    </S.Dropdown>
  );
}

export default Dropdown;

const S = {
  Dropdown: styled.div`
    display: inline-block;

    &:hover {
      cursor: pointer;
    }

    .selected {
      .icon {
        font-size: 15px;
        margin-left: 5px;
      }
    }

    .options {
      ${({ isOpen }) => css`
        position: absolute;
        display: ${isOpen ? "inline-block" : "none"};
        width: inherit;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 10px 15px;
        background-color: white;

        .option {
          margin: 10px 0;
        }
      `}
    }
  `,
};
