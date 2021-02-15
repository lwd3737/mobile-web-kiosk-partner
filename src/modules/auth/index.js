import { createAsyncThunk } from 'common/utils/asyncUtils';
import * as partnerApi from 'api/auth';

//action type
export const REQUEST_LOGIN = 'partner/REQUEST_LOGIN';
export const REQUEST_LOGIN_SUCCESS = 'partner/REQUEST_LOGIN_SUCCESS';
export const REQUEST_LOGIN_FAILED = 'partner/REQUEST_LOGIN_FAILED';

//redux thunk
export const getPartnerDataThunk = createAsyncThunk(
    REQUEST_LOGIN, 
    partnerApi.getPartnerData
);

const initialState = {
    
}