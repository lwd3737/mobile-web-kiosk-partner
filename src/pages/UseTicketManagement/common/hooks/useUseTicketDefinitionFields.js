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

function useUseTicketDefinitionFields({ partnerId }) {
  const dispatch = useDispatch();
  //console.log("inputs: ", inputs);
  //const { categoryId, periodUnit, period, price } = inputs;
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

  const handleFieldValueChange = useCallback((e, field, setFieldValue) => {
    const { value } = e.target;

    setFieldValue({
      ...field,
      value,
    });
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

  useEffect(
    function initializeCategoryField() {
      const defaultOption = categoryOptions[0];

      setCategoryField({
        ...categoryField,
        options: categoryOptions,
        defaultOption,
        extraHandlers: {
          onOptionDelete: (e, option) => handleOptionDeleteClick(e, option),
        },
        value: defaultOption?.value,
      });
    },
    [categoryOptions]
  );

  const categoryFieldComponent = useMemo(() => {
    return (
      <FormField
        key={categoryField.name}
        {...categoryField}
        onChange={(e) =>
          handleFieldValueChange(e, categoryField, setCategoryField)
        }
      />
    );
  }, [categoryField]);

  useEffect(
    function initializePeriodUnitField() {
      const defaultOption = periodUnitField.options[0];

      setPeriodUnitField({
        ...periodUnitField,
        defaultOption,
        value: defaultOption?.value,
      });
    },
    [periodField.value]
  );

  const periodUnitFieldComponent = useMemo(
    () => (
      <FormField
        key={periodUnitField.name}
        {...periodUnitField}
        onChange={(e) =>
          handleFieldValueChange(e, periodUnitField, setPeriodUnitField)
        }
      />
    ),
    [periodUnitField]
  );

  useEffect(
    function initializePeriodField() {
      setPeriodField({
        ...periodField,
      });
    },
    [periodField.value]
  );

  const periodFieldComponent = useMemo(
    () => (
      <FormField
        key={periodField.name}
        {...periodField}
        onChange={(e) => handleFieldValueChange(e, periodField, setPeriodField)}
      />
    ),
    [periodField]
  );

  useEffect(
    function initializePriceField() {
      setPriceField({
        ...priceField,
      });
    },
    [priceField.value]
  );

  const priceFieldComponent = useMemo(
    () => (
      <FormField
        key={priceField.name}
        {...priceField}
        onChange={(e) => handleFieldValueChange(e, priceField, setPriceField)}
      />
    ),
    [priceField]
  );

  const results = useMemo(() => {
    return {
      fields: {
        [categoryField.name]: categoryField.value,
        [periodUnitField.name]: periodField.value,
        [periodField.name]: periodField.value,
        [priceField.name]: priceField.value,
      },
      fieldComponents: [
        categoryFieldComponent,
        periodUnitFieldComponent,
        periodFieldComponent,
        priceFieldComponent,
      ],
    };
  }, [categoryField, periodUnitField, periodField, priceField]);

  return results;
}

export default useUseTicketDefinitionFields;
