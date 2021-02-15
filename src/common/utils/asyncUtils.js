export const createAsyncThunk = (type, asyncApi, loadingType) => {
    return (param) => async (dispatch, getState) => {
        const [SUCCESS, FAILED] = [`${type}_SUCCESS`, `${type}_FAILED`];
        
        if(loadingType){
            dispatch({type: loadingType, action: type});
        } else {
            dispatch({type, param});
        }

        try{
            const payload = await asyncApi(param);
            dispatch({ type: SUCCESS, payload});
        } catch(e){
            dispatch({ type: FAILED, error: e});
        }
    }
};