import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import userAPI from '../../api/userApi';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: null,
  userData: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// get user Profile
export const getProfile = createAsyncThunk('user/getProfile', async (userId, thunkAPI) => {
  try {
    return await userAPI.getProfile(userId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// update user Profile
export const updateProfile = createAsyncThunk('user/updateprofile', async (userInfo, thunkAPI) => {
  try {
    const response = await userAPI.updateProfile(userInfo);
    toast.success(response?.message);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: 'user',
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
      // GetProfile cases
      .addCase(getProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userData = action.payload;
      })
      // login cases
      .addCase(updateProfile.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.userData = null;
      });
  }
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
