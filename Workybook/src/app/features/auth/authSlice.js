import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import authAPI from '../../api/authApi';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const fetchUserByToken = createAsyncThunk('auth/fetchUserByToken', async (currentUser, thunkAPI) => {
  try {
    const response = await authAPI.getCurrentUser(currentUser);
    return response.data;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const worksheetDetails = createAsyncThunk('home/worksheetDetails', async (worksheetId, thunkAPI) => {
  try {
    const response = await homeAPI.worksheetDetails(worksheetId);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const register = createAsyncThunk('auth/register', async (userRegister, thunkAPI) => {
  try {
    return await authAPI.register(userRegister);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const verifyEmail = createAsyncThunk('auth/verifyEmail', async (emailVerificationId, thunkAPI) => {
  const notify = (x) => {
    toast.error(x, {
      toastId: x
    });
  };
  try {
    return await authAPI.verifyEmail(emailVerificationId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    notify(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const login = createAsyncThunk('auth/login', async (userLogin, thunkAPI) => {
  try {
    return await authAPI.login(userLogin);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const googleLogin = createAsyncThunk('auth/loginWithGoogle', async (userLogin, thunkAPI) => {
  try {
    return await authAPI.googleLogin(userLogin);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const googleRegister = createAsyncThunk('auth/registerWithGoogle', async (userRegister, thunkAPI) => {
  try {
    return await authAPI.googleRegister(userRegister);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (emailId, thunkAPI) => {
  try {
    return await authAPI.forgotPassword(emailId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (password, thunkAPI) => {
  try {
    return await authAPI.resetPassword(password);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authAPI.logout();
});

export const resendVerificationEmail = createAsyncThunk('auth/resend-verification-email', async (emailId, thunkAPI) => {
  try {
    return await authAPI.resendVerificationMail(emailId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isGoogle = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // register cases
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      // google register email cases
      .addCase(googleRegister.pending, (state, action) => {
        state.isLoading = true;
        state.isGoogle = true;
      })
      .addCase(googleRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isGoogle = true;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = action.payload;
      })
      .addCase(googleRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isGoogle = true;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // verify email cases
      .addCase(verifyEmail.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // login cases
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // googleLogin cases
      .addCase(googleLogin.pending, (state, action) => {
        state.isLoading = true;
        state.isGoogle = true;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isGoogle = true;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isGoogle = true;
        state.message = action.payload;
        state.user = null;
      })
      // forgot password cases
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      // reset password cases
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      // logout cases
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(resendVerificationEmail.pending, (state, action) => {
        state.isLoading = true;
      });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
