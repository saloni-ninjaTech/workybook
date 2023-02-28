import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import notificationAPI from '../../api/notificationApi';

export const getNotification = createAsyncThunk('notification/notificationAPI', async (data) => {
  try {
    const response = await notificationAPI.getNotification(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const initialState = {
  notification: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.grades = action.payload;
        state.notification = action.payload.list;
      })
      .addCase(getNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.notification = null;
      });
  }
});

export default notificationSlice.reducer;
