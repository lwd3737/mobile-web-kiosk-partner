import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Form, SimpleButton } from "common/components";
import { useUseTicketDefinitionFields } from "../hooks";
import {
  GET_USETICKET_CATEGORIES_FAILED,
  DELETE_USETICKET_CATEGORY_FAILED,
  CREATE_USETICKET_DEFINITION_FAILED,
  deleteUseTicketCatoryThunk,
  getUseTicketCategoriesThunk,
} from "modules/usetickets";

function UseTicketDefinitionForm({ defaultInputs, callUpdateDispatch }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const partnerId = useSelector((state) => state.auth.partner.id);

  const [inputs, setInputs] = useState({
    categoryId: null,
    periodUnit: null,
    period: null,
    price: null,
  });

  const onChange = useCallback(
    (e, target) => {
      const { name, value } = e ? e : target;

      setInputs({
        ...inputs,
        [name]: value,
      });
    },
    [inputs]
  );

  const { fields, fieldComponents } = useUseTicketDefinitionFields({
    partnerId,
    inputs,
    onChange,
  });

  const handlePrevClick = useCallback(() => {
    history.replace("/partner/usetickets");
  }, []);

  const handleUpdateClick = useCallback(() => {
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

    const failedCb = (getState) => {
      const error = getState().appStatus.errors.find(
        (error) => error.type === CREATE_USETICKET_DEFINITION_FAILED
      );

      error && window.alert(error.message);
    };

    callUpdateDispatch(
      { partnerId, inputs },
      {
        failedCb,
      }
    );

    handlePrevClick();
  }, [inputs]);

  const renderBottom = useCallback(() => {
    return (
      <>
        <SimpleButton
          className="prev-btn"
          backgroundColor={"gray1"}
          onClick={handlePrevClick}
        >
          이전
        </SimpleButton>
        <SimpleButton
          className="next-btn"
          extraStyle={{
            marginLeft: "20px",
          }}
          onClick={handleUpdateClick}
        >
          생성
        </SimpleButton>
      </>
    );
  }, []);

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
      const _inputs = defaultInputs ? defaultInputs : inputs;

      setInputs({
        ..._inputs,
        categoryId: fields.categoryField.defaultOption?.value,
        periodUnit: fields.periodUnitField.defaultOption?.value,
      });
    },
    [fields.categoryField, fields.periodUnitField]
  );

  return <Form fieldComponents={fieldComponents} bottom={renderBottom()} />;
}

export default React.memo(UseTicketDefinitionForm);
