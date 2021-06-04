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

  const handleOptionsClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleOptionSelect = useCallback(
    (e, option) => {
      e.stopPropagation();

      setSelectedOption(option);
      handleOptionsClick();
    },
    [selectedOption]
  );

  const triggerOptionChange = useCallback(
    (defaultOption) => {
      const target = {
        name,
        value: defaultOption ? defaultOption : value,
      };

      onChange({ target });
    },
    [value]
  );

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
        onClick={(e) => handleOptionSelect(e, option)}
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
      <div className="selected" onClick={handleOptionsClick}>
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
