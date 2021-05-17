import { createAsyncThunk } from "common/utils/asyncUtils";
import * as useticketsApi from "api/usetickets";
import { createFactory } from "react";

const GET_USETICKET_CATEGORIES = "usetickets/GET_USETICKET_CATEGORIES";
const GET_USETICKET_CATEGORIES_SUCCESS =
  "usetickets/GET_USETICKET_CATEGORIES_SUCCESS";
export const GET_USETICKET_CATEGORIES_FAILED =
  "usetickets/GET_USETICKET_CATEGORIES_FAILED";

const CREATE_USETICKET_CATEGORY = "usetickets/CREATE_USETICKET_CATEGORY";
const CREATE_USETICKET_CATEGORY_SUCCESS =
  "usetickets/CREATE_USETICKET_CATEGORY_SUCCESS";
export const CREATE_USETICKET_CATEGORY_FAILED =
  "usetickets/CREATE_USETICKET_CATEGORY_FAILED";

const DELETE_USETICKET_CATEGORY = "usetickets/DELETE_USETICKET_CATEGORY";
const DELETE_USETICKET_CATEGORY_SUCCESS =
  "usetickets/DELETE_USETICKET_CATEGORY_SUCCESS";
export const DELETE_USETICKET_CATEGORY_FAILED =
  "usetickets/DELETE_USETICKET_CATEGORY_FAILED";

const GET_USETICKET_DEFINITIONS = "usetickets/GET_USETICKET_DEFINITIONS";
const GET_USETICKET_DEFINITIONS_SUCCESS =
  "usetickets/GET_USETICKET_DEFINITIONS_SUCCESS";
export const GET_USETICKET_DEFINITIONS_FAILED =
  "usetickets/GET_USETICKET_DEFINITIONS_FAILED";

const CREATE_USETICKET_DEFINITION = "usetickets/CREATE_USETICKET_DEFINITION";
const CREATE_USETICKET_DEFINITION_SUCCESS =
  "usetickets/CREATE_USETICKET_DEFINITION_SUCCESS";
export const CREATE_USETICKET_DEFINITION_FAILED =
  "usetickets/CREATE_USETICKET_DEFINITION_FAILED";

const MODIFY_USETICKET_DEFINITION = "usetickets/MODIFY_USETICKET_DEFINITION";
const MODIFY_USETICKET_DEFINITION_SUCCESS =
  "usetickets/MODIFY_USETICKET_DEFINITION_SUCCESS";
export const MODIFY_USETICKET_DEFINITION_FAILED =
  "usetickets/MODIFY_USETICKET_DEFINITION_FAILED";

export const createUseTicketCatetoryThunk = createAsyncThunk(
  CREATE_USETICKET_CATEGORY,
  useticketsApi.createUseticketCatetory
);

export const getUseTicketCategoriesThunk = createAsyncThunk(
  GET_USETICKET_CATEGORIES,
  useticketsApi.getUseticketCategories
);

export const deleteUseTicketCatoryThunk = createAsyncThunk(
  DELETE_USETICKET_CATEGORY,
  useticketsApi.deleteUseticketCategory
);

export const getUseTicketDefinitionsThunk = createAsyncThunk(
  GET_USETICKET_DEFINITIONS,
  useticketsApi.getUseticketDefinitions
);

export const createUseTicketDefinitionThunk = createAsyncThunk(
  CREATE_USETICKET_DEFINITION,
  useticketsApi.createUseticketDefinition
);

export const modifyUseTicketDefinitionThunk = createAsyncThunk(
  MODIFY_USETICKET_DEFINITION,
  useticketsApi.modifyUseticketDefinition
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
    case DELETE_USETICKET_CATEGORY_SUCCESS: {
      const { id } = action.payload;
      const categories = state.categories;
      const byId = { ...categories.byId };
      delete byId[id];

      return {
        ...state,
        categories: {
          byId,
          allIds: categories.allIds.filter((id) => id !== id),
        },
      };
    }
    case GET_USETICKET_DEFINITIONS_SUCCESS: {
      const definitions = action.payload;
      console.log("definitions: ", definitions, action);

      return {
        ...state,
        definitions: {
          byId:
            definitions?.reduce((obj, definition) => {
              obj[definition.id] = {
                ...definition,
              };

              return obj;
            }, {}) || {},
          allIds: definitions?.map((definition) => definition.id) || [],
        },
      };
    }
    case CREATE_USETICKET_DEFINITION_SUCCESS: {
      //const useticket = action.payload
      //   return {
      //     ...state,
      //     definitions: {
      //       byId: {
      //         ...state.definitions.byId,
      //         [useticket.id]: {
      //           ...useticket,
      //         },
      //       },
      //       allIds: [...state.definitions.allIds, useticket.id],
      //     },
      //   };
      return {
        ...state,
      };
    }
    case MODIFY_USETICKET_DEFINITION_SUCCESS: {
      return {
        ...state,
      };
    }
  }
};

export default function useticketsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USETICKET_CATEGORIES_SUCCESS:
    case CREATE_USETICKET_CATEGORY_SUCCESS:
    case DELETE_USETICKET_CATEGORY_SUCCESS:
    case GET_USETICKET_DEFINITIONS_SUCCESS:
    case CREATE_USETICKET_DEFINITION_SUCCESS:
    case MODIFY_USETICKET_DEFINITION_SUCCESS:
      return handleSuccess(state, action);
    default:
      return state;
  }
}
