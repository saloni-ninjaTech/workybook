import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import homeAPI from '../../api/homeApi';

const initialState = {
  worksheetData: null,
  worksheetDetailsInfo: null,
  subjectData: null,
  ccsData: null,
  likeResponse: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const worksheetDetails = createAsyncThunk('home/worksheetDetails', async (worksheetId, thunkAPI) => {
  try {
    const response = await homeAPI.worksheetDetails(worksheetId);
    return response.content;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// List Subject
export const listSubject = createAsyncThunk('home/subject', async (subjectData, thunkAPI) => {
  try {
    const response = await homeAPI.listSubject(subjectData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// List Subject
export const listCCL = createAsyncThunk('home/commonCoreStandard', async (ccsData, thunkAPI) => {
  try {
    const response = await homeAPI.listCCL(ccsData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
// List Subject
export const getSubGradeAndId = createAsyncThunk('home/getSubGradeAndId', async (ccsData, thunkAPI) => {
  try {
    const response = await homeAPI.getSubGradeAndId(ccsData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// List getCommonCoreStandardGradeAndId
export const getCommonCoreStandardGradeAndId = createAsyncThunk('home/getCommonCoreStandardGradeAndId', async (ccsData, thunkAPI) => {
  try {
    const response = await homeAPI.getCommonCoreStandardGradeAndId(ccsData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Like Worksheet
export const likeWorksheet = createAsyncThunk('home/likeWorksheet', async (worksheetData, thunkAPI) => {
  try {
    const response = await homeAPI.likeWorksheet(worksheetData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    reset: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // new Workybook List cases
      // .addCase(newWorksheet.pending, (state, action) => {
      //   state.isLoading = true;
      // })
      // .addCase(newWorksheet.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.worksheetData = action.payload;
      // })
      // .addCase(newWorksheet.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload;
      //   state.worksheetData = null;
      // })
      // Workysheet Details cases
      .addCase(worksheetDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(worksheetDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.worksheetDetailsInfo = action.payload;
      })
      .addCase(worksheetDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.worksheetDetailsInfo = null;
      })
      // Subject List cases
      .addCase(listSubject.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(listSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subjectData = action.payload;
      })
      .addCase(listSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.subjectData = null;
      })
      // getSubGradeAndId Cases
      .addCase(getSubGradeAndId.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getSubGradeAndId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.getSubGradeAndIdData = action.payload;
      })
      .addCase(getSubGradeAndId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.getSubGradeAndIdData = null;
      })

      // getCommonCoreStandardGradeAndId Cases
      .addCase(getCommonCoreStandardGradeAndId.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCommonCoreStandardGradeAndId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.CommonCoreStandardGradeAndId = action.payload;
      })
      .addCase(getCommonCoreStandardGradeAndId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.CommonCoreStandardGradeAndId = null;
      })

      // CCL List Cases
      .addCase(listCCL.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(listCCL.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ccsData = action.payload;
      })
      .addCase(listCCL.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.ccsData = null;
      })
      // Like worksheet Cases
      .addCase(likeWorksheet.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(likeWorksheet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.likeResponse = action.payload;
      })
      .addCase(likeWorksheet.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.likeResponse = null;
      });
  }
});

export const { reset } = homeSlice.actions;
export default homeSlice.reducer;
