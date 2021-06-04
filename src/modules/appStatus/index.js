const LOADING = "appStatus/LOADING";
const FAILED = "appStatus/FAILED";
const FINISHED = "appStatus/FINISHED";

export const loading = () => ({
  type: LOADING,
});

export const failed = (error) => ({
  type: FAILED,
  error,
});

export const finished = () => ({
  type: FINISHED,
});

// const isSuccessType = (type) => {
//   return type.endsWith("SUCCESS");
// };

// const isFailedType = (type) => {
//   return type.endsWith("FAILED");
// };

const initialState = {
  loading: false,
  errorMessage: null,
};

export default function appStatusReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case FAILED: {
      const { error } = action;
      const errorMessage = error.response.data.errorMessage || error.message;
      console.log("errorMessage: ", errorMessage);
      return {
        ...state,
        errorMessage,
      };
    }
    case FINISHED: {
      return {
        loading: false,
        errorMessage: null,
      };
    }
    default:
      return state;
  }
}

// const removeLoading = (state, type) => {
//   return state.filter((_type) => _type !== type);
// };

// export default function appStatusReducer(state = initialState, action) {
//   if (isLoadingType(action.type)) {
//     return {
//       ...state,
//       loading: state.loading.find((_type) => _type === action.type)
//         ? state.loading
//         : state.loading.concat(action.type),
//     };
//   } else if (isSuccessType(action.type)) {
//     return {
//       ...state,
//       loading: removeLoading(state.loading, action.type),
//       errors: state.errors.filter((error) => error.type !== action.type),
//     };
//   } else if (isFailedType(action.type)) {
//     const { type, error } = action;
//     // const message = error.response?.data.errorMessage
//     //   ? error.response.data.errorMessage
//     //   : error.message;
//     console.log("error res: ", error.response.data.errorMessage);
//     const message = error.response.data.errorMessage;

//     return {
//       ...state,
//       loading: removeLoading(state.loading, action.type),
//       error: {
//         type,
//         message,
//       },
//     };
//   } else {
//     return state;
//   }
// }
