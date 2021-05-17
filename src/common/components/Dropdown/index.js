import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled, { css } from "styled-components";

function Dropdown({
  name,
  value,
  options,
  defaultOption,
  onChange,
  extraHandlers,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { onOptionDelete } = extraHandlers || {};

  const handleToggleOptionsClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleSelectOption = useCallback(
    (e, option) => {
      e.stopPropagation();

      setSelectedOption(option);
      handleToggleOptionsClick();
    },
    [selectedOption]
  );

  const triggerOptionChange = useCallback((value) => {
    console.log("selected: ", selectedOption);
    onChange(null, { name, value });
  }, []);

  useEffect(
    function intializeSelectedOption() {
      if (!defaultOption || !defaultOption.value) return;

      triggerOptionChange(defaultOption.value);
    },
    [defaultOption]
  );

  useEffect(
    function updateSelectedOption() {
      if (!selectedOption || !selectedOption.value) return;

      triggerOptionChange(selectedOption.value);
    },
    [selectedOption]
  );

  const Options = useMemo(() => {
    return options?.map((option, i) => (
      <li
        key={i}
        className="option"
        onClick={(e) => handleSelectOption(e, option)}
      >
        <div className="label">{option.label}</div>
        {onOptionDelete && (
          <div
            className="delete"
            onClick={(e) => onOptionDelete(e, selectedOption)}
          >
            X
          </div>
        )}
      </li>
    ));
  }, [options]);

  useEffect(
    function initializeDefaultOption() {
      setSelectedOption(defaultOption);
    },
    [defaultOption]
  );

  console.log("dropdown render: ", name);

  return (
    <S.Dropdown isOpen={isOpen}>
      <div className="selected" onClick={handleToggleOptionsClick}>
        <span className="label">{selectedOption?.label}</span>
        <span className="icon">{isOpen ? "▲" : "▼"}</span>
      </div>
      <ul className="options">{isOpen && Options}</ul>
    </S.Dropdown>
  );
}

export default React.memo(Dropdown);

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
        background-color: white;

        .option {
          display: flex;
          justify-content: space-between;
          padding: 15px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);

          .label {
            text-align: center;
          }

          .delete {
            color: red;
            margin-left: 8px;
          }
        }
      `}
    }
  `,
};
