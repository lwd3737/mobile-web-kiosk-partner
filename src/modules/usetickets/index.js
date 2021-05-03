import { createAsyncThunk } from "common/utils/asyncUtils";
import * as useticketsApi from "api/usetickets";
import { createFactory } from "react";

const CREATE_USETICKET_CATEGORY = "usetickets/CREATE_USETICKET_CATEGORY";
const CREATE_USETICKET_CATEGORY_SUCCESS =
  "usetickets/CREATE_USETICKET_CATEGORY_SUCCESS";
export const CREATE_USETICKET_CATEGORY_FAILED =
  "usetickets/CREATE_USETICKET_CATEGORY_FAILED";

const GET_USETICKET_CATEGORIES = "usetickets/GET_USETICKET_CATEGORIES";
const GET_USETICKET_CATEGORIES_SUCCESS =
  "usetickets/GET_USETICKET_CATEGORIES_SUCCESS";
export const GET_USETICKET_CATEGORIES_FAILED =
  "usetickets/GET_USETICKET_CATEGORIES_FAILED";

const CREATE_USETICKET_DEFINITION = "usetickets/CREATE_USETICKET_DEFINITION";
const CREATE_USETICKET_DEFINITION_SUCCESS =
  "usetickets/CREATE_USETICKET_DEFINITION_SUCCESS";
export const CREATE_USETICKET_DEFINITION_FAILED =
  "usetickets/CREATE_USETICKET_DEFINITION_FAILED";

export const createUseTicketCatetoryThunk = createAsyncThunk(
  CREATE_USETICKET_CATEGORY,
  useticketsApi.createUseticketCatetory
);

export const getUseTicketCategoriesThunk = createAsyncThunk(
  GET_USETICKET_CATEGORIES,
  useticketsApi.getUseticketCategories
);

export const createUseticketDefinitionThunk = createAsyncThunk(
  CREATE_USETICKET_DEFINITION,
  useticketsApi.createUseticketDefinition
);

const initialState = {
  categories: {
    byId: {},
    allIds: [],
  },
  definitions: {
    byId: {},
    allIds: [],
  },
};

const handleSuccess = (state, action) => {
  switch (action.type) {
    case CREATE_USETICKET_CATEGORY_SUCCESS: {
      const { id, name } = action.payload;

      return {
        ...state,
        categories: {
          byId: {
            ...state.categories.byId,
            [id]: {
              id,
              name,
            },
          },
          allIds: [...state.categories.allIds, id],
        },
      };
    }
    case GET_USETICKET_CATEGORIES_SUCCESS: {
      const categories = action.payload;
      return {
        ...state,
        categories: {
          byId: categories.reduce((obj, category) => {
            obj[category.id] = {
              ...category,
            };
            return obj;
          }, {}),
          allIds: categories.map((category) => category.id),
        },
      };
    }
    case CREATE_USETICKET_DEFINITION_SUCCESS: {
      const useticket = action.payload;

      return {
        ...state,
        definitions: {
          byId: {
            ...state.definitions.byId,
            [useticket.id]: {
              ...useticket,
            },
          },
          allIds: [...state.definitions.allIds, useticket.id],
        },
      };
    }
  }
};

export default function useticketsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USETICKET_CATEGORY_SUCCESS:
    case CREATE_USETICKET_DEFINITION_SUCCESS:
    case GET_USETICKET_CATEGORIES_SUCCESS:
      return handleSuccess(state, action);
    default:
      return state;
  }
}
