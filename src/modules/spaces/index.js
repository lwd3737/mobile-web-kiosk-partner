import { createAsyncThunk } from 'common/utils/asyncUtils';

//action type
const GET_SPACE_LIST = 'spaces/GET_SPACE_LIST';
const GET_SPACE_LIST_SUCCESS = 'spaces/GET_SPACE_LIST_SUCCESS';
const GET_SPACE_LIST_FAILED = 'spaces/GET_SPACE_LIST_FAILED';

//redux thunk
const getSpaceList = createAsyncThunk(GET_SPACE_LIST, )