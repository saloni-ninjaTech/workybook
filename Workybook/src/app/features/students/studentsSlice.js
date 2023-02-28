import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import studentsAPI from '../../api/studentsAPI';

export const createStudents = createAsyncThunk('students/createStudents', async (data, thunkAPI) => {
  try {
    const response = await studentsAPI.createStudents(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getStudents = createAsyncThunk('students/getStudents', async (classId, thunkAPI) => {
  try {
    const response = await studentsAPI.getStudents(classId);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const importStudentCsv = createAsyncThunk('students/importStudentCsv', async (classId, thunkAPI) => {
  try {
    const response = await studentsAPI.importStudentCsv(classId);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getStudent = createAsyncThunk('students/getStudent', async (studentId, thunkAPI) => {
  try {
    const response = await studentsAPI.getStudent(studentId);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const editStudent = createAsyncThunk('students/editStudent', async (data, thunkAPI) => {
  try {
    const response = await studentsAPI.editStudent(data);
    toast.success(response?.message);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    toast.error(error.response.data.message);
    // console.log(error.response.data, 'message');
    return thunkAPI.rejectWithValue(error.response);
  }
});

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (data, thunkAPI) => {
  try {
    const response = await studentsAPI.deleteStudent(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    students: [],
    currentStudent: null,
    newStudents: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
  },
  reducers: {
    setStudent(state, action) {
      state.currentStudent = action.payload;
    },
    setStudents(state, action) {
      state.students = action.payload;
    },
    resetNewStudents(state) {
      state.newStudents = [];
      state.isLoading = false;
      state.isError = false;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(importStudentCsv.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(importStudentCsv.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newStudents = action.payload;
      })
      .addCase(importStudentCsv.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newStudents = action.payload;
      })
      .addCase(createStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStudents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.students = action.payload;
      })
      .addCase(getStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentStudent = action.payload;
      })
      .addCase(editStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteStudent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentStudent = null;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { setStudent, resetNewStudents, setStudents } = studentsSlice.actions;
export default studentsSlice.reducer;
