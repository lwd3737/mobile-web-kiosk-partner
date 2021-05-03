export const createAsyncThunk = (type, asyncApi) => {
  return (param, options) => async (dispatch, getState) => {
    const [SUCCESS, FAILED] = [`${type}_SUCCESS`, `${type}_FAILED`];
    dispatch({ type, param });

    const { successCb, failedCb } = options || {};

    try {
      const payload = await asyncApi(param);
      dispatch({ type: SUCCESS, payload });

      successCb && successCb(getState, payload);
    } catch (e) {
      dispatch({ type: FAILED, error: e });

      failedCb && failedCb(getState);
    }
  };
};
