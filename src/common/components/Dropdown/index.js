import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Dropdown({ inputId, inputName, value, options, onInputChange }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDropdownClick = (e) => {
    e.stopPropagation();

    setIsOpen(true);
  };

  const handleSelectOption = (e, option) => {
    e.stopPropagation();

    setSelectedOption(option);
  };

  useEffect(function initializeSelected() {
    if (!options || !options.length === 0) return;
    setSelectedOption(options[0]);
  }, []);

  return (
    <S.Dropdown>
      <input
        type="hidden"
        id={inputId}
        name={inputName}
        value={value}
        onChange={onInputChange}
      />
      <div className="selected" onClick={(e) => handleOpenDropdownClick(e)}>
        {selectedOption?.label}
      </div>
      <ul className="options">
        {isOpen &&
          options.map((option) => (
            <li
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
    .selcted {
    }

    .options {
    }
  `,
};
