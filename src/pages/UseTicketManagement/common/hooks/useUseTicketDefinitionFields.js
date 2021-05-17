import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { FormField } from "common/components";
import {
  GET_USETICKET_CATEGORIES_FAILED,
  DELETE_USETICKET_CATEGORY_FAILED,
  CREATE_USETICKET_DEFINITION_FAILED,
  deleteUseTicketCatoryThunk,
  getUseTicketCategoriesThunk,
} from "modules/usetickets";

function useUseTicketDefinitionFields({ partnerId, inputs, onChange }) {
  const dispatch = useDispatch();
  console.log("inputs: ", inputs);
  const { categoryId, periodUnit, period, price } = inputs;
  const [categoryField, setCategoryField] = useState({
    labelText: "이용권 종류",
    inputType: "select",
    name: "categoryId",
    options: null,
    defaultOption: null,
    extraHandlers: {
      onOptionDelete: null,
    },
    value: null,
  });
  const [periodUnitField, setPeriodUnitField] = useState({
    labelText: "이용시간 단위",
    inputId: "period-unit",
    inputType: "select",
    name: "periodUnit",
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
    defaultOption: null,
    value: null,
  });
  const [periodField, setPeriodField] = useState({
    labelText: "이용시간",
    inputId: "period",
    inputType: "number",
    name: "period",
    value: null,
  });
  const [priceField, setPriceField] = useState({
    labelText: "가격",
    inputId: "price",
    inputType: "number",
    name: "price",
    value: null,
  });

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

  const handleOptionDeleteClick = useCallback((e, option) => {
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
  }, []);

  useEffect(
    function initializeCategoryField() {
      setCategoryField({
        ...categoryField,
        options: categoryOptions,
        defaultOption: categoryOptions[0],
        extraHandlers: {
          onOptionDelete: (e, option) => handleOptionDeleteClick(e, option),
        },
        value: categoryId,
      });
    },
    [categoryId, categoryOptions]
  );

  const categoryFieldComponent = useMemo(() => {
    return (
      <FormField
        key={categoryField.name}
        {...categoryField}
        onChange={onChange}
      />
    );
  }, [categoryField]);

  useEffect(
    function initializePeriodUnitField() {
      setPeriodUnitField({
        ...periodUnitField,
        defaultOption: periodUnitField.options[0],
        value: periodUnit,
      });
    },
    [periodUnit]
  );

  const periodUnitFieldComponent = useMemo(
    () => (
      <FormField
        key={periodUnitField.name}
        {...periodUnitField}
        onChange={onChange}
      />
    ),
    [periodUnitField]
  );

  useEffect(
    function initializePeriodField() {
      setPeriodField({
        ...periodField,
        value: period,
      });
    },
    [period]
  );

  const periodFieldComponent = useMemo(
    () => (
      <FormField key={periodField.name} {...periodField} onChange={onChange} />
    ),
    [periodField]
  );

  useEffect(
    function initializePriceField() {
      setPriceField({
        ...priceField,
        value: price,
      });
    },
    [price]
  );

  const priceFieldComponent = useMemo(
    () => (
      <FormField key={priceField.name} {...priceField} onChange={onChange} />
    ),
    [priceField]
  );

  return {
    fields: {
      categoryField,
      periodUnitField,
      periodField,
      priceField,
    },
    fieldComponents: [
      categoryFieldComponent,
      periodUnitFieldComponent,
      periodFieldComponent,
      priceFieldComponent,
    ],
  };
}

export default useUseTicketDefinitionFields;
