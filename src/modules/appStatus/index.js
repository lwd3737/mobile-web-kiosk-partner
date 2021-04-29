import {
  GET_ROOM_LIST,
  CREATE_ROOM,
  GET_ROOM,
  MODIFY_ROOM,
  DELETE_ROOM,
} from "../rooms";

import {
  REQUEST_LOGIN,
  // REQUEST_AUTO_LOGIN
} from "../auth";

//reducer utils
const LOADING_TYPES = [
  GET_ROOM_LIST,
  CREATE_ROOM,
  GET_ROOM,
  MODIFY_ROOM,
  DELETE_ROOM,
  REQUEST_LOGIN,
  // REQUEST_AUTO_LOGIN
];

const isLoadingType = (type) => {
  return type in LOADING_TYPES;
};

const isSuccessType = (type) => {
  return type.endsWith("SUCCESS");
};

const isFailedType = (type) => {
  return type.endsWith("FAILED");
};

const initialState = {
  loading: [],
  errors: [], //{ type: '...', message: '...' }
};

const removeLoading = (state, type) => {
  return state.filter((_type) => _type !== type);
};

export default function appStatusReducer(state = initialState, action) {
  if (isLoadingType(action.type)) {
    return {
      ...state,
      loading: state.loading.find((_type) => _type === action.type)
        ? state.loading
        : state.loading.concat(action.type),
    };
  } else if (isSuccessType(action.type)) {
    return {
      ...state,
      loading: removeLoading(state.loading, action.type),
      errors: state.errors.filter((error) => error.type !== action.type),
    };
  } else if (isFailedType(action.type)) {
    const { message } = action.error;
    return {
      ...state,
      loading: removeLoading(state.loading, action.type),
      errors: state.errors.find((error) => error.type === action.type)
        ? state.errors.map((error) =>
            error.type === action.type ? { type: action.type, message } : error
          )
        : state.errors.concat({
            type: action.type,
            message,
          }),
    };
  } else {
    return state;
  }
}
