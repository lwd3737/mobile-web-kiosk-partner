import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { UseTicketDefinitionCreationForm } from "../components";
import {
  CREATE_USETICKET_DEFINITION_FAILED,
  createUseticketDefinitionThunk,
} from "modules/usetickets";

function UseTicketDefinitionCreationFormContainer() {
  const history = useHistory();
  const dispatch = useDispatch();
  const partnerId = useSelector((state) => state.auth.partner.id);
  const categoriesSlice = useSelector((state) => state.usetickets.categories);
  const [inputs, setInputs] = useState({
    name: null,
    periodUnit: "H",
    period: null,
    price: null,
  });
  const { name, periodUnit, period, price } = inputs;

  const fields = [
    {
      labelText: "이용권 종류",
      inputId: "useticket-name",
      inputType: "select",
      inputName: "name",
      options: categoriesSlice.allIds.map((category) => {
        return [category.name, category.id];
      }),
      value: name,
    },
    {
      labelText: "이용시간 단위",
      inputId: "period-unit",
      inputType: "select",
      inputName: "periodUnit",
      options: [
        ["시간", "H"],
        ["일", "D"],
        ["주", "W"],
        ["개월", "M"],
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
    const { name, periodUnit, period, price } = inputs;

    const makeMessage = (text) => {
      return `${text}을(를) 입력해주세요.`;
    };

    if (!name) {
      return alert(makeMessage("이용권 이름"));
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
      createUseticketDefinitionThunk(
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
