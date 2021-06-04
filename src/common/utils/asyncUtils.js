import { loading, failed, finished } from "modules/appStatus";

export const createAsyncThunk = (type, asyncApi) => {
  return (param, options) => async (dispatch, getState) => {
    //const [SUCCESS, FAILED] = [`${type}_SUCCESS`, `${type}_FAILED`];
    //dispatch({ type, param });
    const SUCCESS = `${type}_SUCCESS`;

    dispatch(loading());
    const { successCb, failedCb } = options || {};
    try {
      const payload = await asyncApi(param);
      dispatch({ type: SUCCESS, payload });
      successCb && successCb(getState, payload);
    } catch (error) {
      dispatch(failed(error));
      failedCb && failedCb(getState);
    } finally {
      dispatch(finished());
    }
  };
};
