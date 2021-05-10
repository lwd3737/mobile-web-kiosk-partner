import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { UseTicketDefinitionCreationForm } from "../components";
import {
  CREATE_USETICKET_DEFINITION_FAILED,
  GET_USETICKET_CATEGORIES_FAILED,
  DELETE_USETICKET_CATEGORY_FAILED,
  createUseTicketDefinitionThunk,
  deleteUseTicketCatoryThunk,
  getUseTicketCategoriesThunk,
} from "modules/usetickets";

function UseTicketDefinitionCreationFormContainer() {
  const history = useHistory();
  const dispatch = useDispatch();

  const partnerId = useSelector((state) => state.auth.partner.id);

  const [inputs, setInputs] = useState({
    categoryId: null,
    periodUnit: null,
    period: null,
    price: null,
  });
  const { categoryId, periodUnit, period, price } = inputs;

  const handleOptionDeleteClick = (e, option) => {
    e.stopPropagation();

    const { value, label } = option;
    const wantToDelete = window.confirm(
      `${label}을(를) 정말 삭제하시겠습니까?`
    );

    if (wantToDelete) {
      const failedCb = (getState) => {
        const error = getState().appStatus.errors.find(
          (error) => error.type === DELETE_USETICKET_CATEGORY_FAILED
        );

        error && window.alert(error.message);
      };

      dispatch(
        deleteUseTicketCatoryThunk(
          { partnerId, id: value },
          {
            successCb: null,
            failedCb,
          }
        )
      );
    }
  };
  const categoriesSlice = useSelector((state) => state.usetickets.categories);
  const categoryOptions = useMemo(
    () =>
      categoriesSlice.allIds.map((_id) => {
        const { id, name } = categoriesSlice.byId[_id];
        return {
          label: name,
          value: id,
        };
      }),
    [categoriesSlice]
  );

  const fields = [
    {
      labelText: "이용권 종류",
      inputId: "useticket-category",
      inputType: "select",
      inputName: "categoryId",
      options: categoryOptions,
      handlers: {
        onOptionDelete: (e, option) => handleOptionDeleteClick(e, option),
      },
      value: categoryId,
    },
    {
      labelText: "이용시간 단위",
      inputId: "period-unit",
      inputType: "select",
      inputName: "periodUnit",
      options: [
        {
          label: "시간",
          value: "H",
        },
        {
          label: "일",
          value: "D",
        },
        {
          label: "주",
          value: "W",
        },
        {
          label: "개월",
          value: "M",
        },
      ],
      value: periodUnit,
    },
    {
      labelText: "이용시간",
      inputId: "period",
      inputType: "number",
      inputName: "period",
      value: period,
    },
    {
      labelText: "가격",
      inputId: "price",
      inputType: "number",
      inputName: "price",
      value: price,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleCreationClick = () => {
    const { categoryId, periodUnit, period, price } = inputs;

    const makeMessage = (text) => {
      return `${text}을(를) 입력해주세요.`;
    };
    if (!categoryId) {
      console.log();
      return alert(makeMessage("이용권 종류"));
    }
    if (!periodUnit) {
      return alert(makeMessage("이용시간 단위"));
    }
    if (!period) {
      return alert(makeMessage("이용시간"));
    }
    if (!price) {
      return alert(makeMessage("가격"));
    }

    const successCb = () => {
      window.alert("이용권이 등록되었습니다.");
      history.push(`/partner/usetickets`);
    };

    const failedCb = (getState) => {
      const error = getState().appStatus.errors.find(
        (error) => error.type === CREATE_USETICKET_DEFINITION_FAILED
      );

      error && window.alert(error.message);
    };

    dispatch(
      createUseTicketDefinitionThunk(
        { partnerId, inputs },
        {
          successCb,
          failedCb,
        }
      )
    );
  };

  const handlePrevClick = () => {
    history.replace("/partner/usetickets");
  };

  useEffect(function loadUseTicketCategories() {
    const failedCb = (getState) => {
      const error = getState().appStatus.errors.find(
        (error) => error.type === GET_USETICKET_CATEGORIES_FAILED
      );

      error && window.alert(error.message);
    };
    dispatch(
      getUseTicketCategoriesThunk({ partnerId }, { successCb: null, failedCb })
    );
  }, []);

  useEffect(
    function initializeInputs() {
      setInputs({
        ...inputs,
        categoryId: categoryOptions[0]?.value,
        periodUnit: fields[1].options[0]?.value,
      });
    },
    [categoryOptions]
  );

  return (
    <UseTicketDefinitionCreationForm
      fields={fields}
      onInputChange={handleInputChange}
      onPrevClick={handlePrevClick}
      onCreationClick={handleCreationClick}
    />
  );
}

export default UseTicketDefinitionCreationFormContainer;
