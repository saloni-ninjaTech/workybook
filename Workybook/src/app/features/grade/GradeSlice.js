import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import gradeAPI from '../../api/GradeApi';

export const fetchGrades = createAsyncThunk('grades/fetchGrades', async () => {
  try {
    const response = await gradeAPI.fetchGrades();
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  grades: [],
  currentGrade: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const GradeSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {
    setCurrentGrade(state, action) {
      state.currentGrade = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.grades = action.payload;
        state.currentGrade = action.payload.list?.[4];
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.grades = null;
      });
  }
});

export const { setCurrentGrade } = GradeSlice.actions;
export default GradeSlice.reducer;
