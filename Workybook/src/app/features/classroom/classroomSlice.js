import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import classroomAPI from '../../api/classroomApi';

export const createClass = createAsyncThunk('classroom/createClass', async (classData, thunkAPI) => {
  try {
    const response = await classroomAPI.createClass(classData);
    return response;
  } catch (error) {
    const message = error?.response?.data?.message;
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const editClass = createAsyncThunk('classroom/editClass', async (data, thunkAPI) => {
  try {
    const response = await classroomAPI.editClass(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const classImportWithExcel = createAsyncThunk('classroom/importExcelClassRoom', async (data, thunkAPI) => {
  try {
    const response = await classroomAPI.classRoomExcelDataImport(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getGoogleClassRoomData = createAsyncThunk('classroom/getGoogleClassRooom', async (data, thunkAPI) => {
  try {
    const response = await classroomAPI.getGoogleClassRoomData(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const getGoogleClassRoomDataInsert = createAsyncThunk('classroom/getGoogleClassRooomInsert', async (data, thunkAPI) => {
  try {
    const response = await classroomAPI.getGoogleClassRoomDatainsert(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// export const getClassRoomOptions = createAsyncThunk('classroom/getClassRoomOptions', async (thunkAPI) => {
//   try {
//     const response = await classroomAPI.getClassRoomOptions();
//     return response;
//   } catch (error) {
//     const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

export const getClassrooms = createAsyncThunk('classroom/getClassrooms', async (thunkAPI) => {
  try {
    const response = await classroomAPI.getClassrooms();
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getClassroom = createAsyncThunk('classroom/getClassroom', async (id, thunkAPI) => {
  try {
    const response = await classroomAPI.getClassroom(id);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const classroomSlice = createSlice({
  name: 'classroom',
  initialState: {
    classes: [],
    currentClass: null,
    updatedClass: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: null
  },
  reducers: {
    setClass(state, action) {
      state.currentClass = action.payload;
    },
    setUpdatedClass(state, action) {
      state.updatedClass = action.payload;
    },
    reset(state) {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.currentClass = action.payload;
        state.currentCreateClass = action.payload;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(editClass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoogleClassRoomData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoogleClassRoomData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.googleClassRoom = action.payload;
      })
      .addCase(getGoogleClassRoomData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.googleClassRoom = null;
      })
      .addCase(classImportWithExcel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(classImportWithExcel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.classImportWithExcel = action.payload;
      })
      .addCase(classImportWithExcel.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.classImportWithExcel = null;
      })
      .addCase(getGoogleClassRoomDataInsert.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoogleClassRoomDataInsert.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.googleClassRoomInsertData = action.payload;
      })
      .addCase(getGoogleClassRoomDataInsert.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.googleClassRoomInsertData = null;
      })
      .addCase(editClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentClass = action.payload;
      })
      .addCase(editClass.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClassroom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClassroom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentClass = action.payload;
      })
      .addCase(getClassroom.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getClassrooms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getClassrooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentClass = action.payload.list?.filter((x) => x?._id === state?.currentCreateClass?.classroom?._id)?.[0] || action.payload.list[0];
        state.classes = action.payload;
      })
      .addCase(getClassrooms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset, setClass, setUpdatedClass } = classroomSlice.actions;
export default classroomSlice.reducer;
