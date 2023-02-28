import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import searchAPI from '../../api/searchApi';

const initialState = {
  searchData: null,
  suggestKeyword: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isSearchResultLoading: false,
  message: ''
};

// List worksheet by search bar text
// eslint-disable-next-line no-shadow
export const search = createAsyncThunk('search/search', async (searchData, thunkAPI) => {
  try {
    const response = await searchAPI.search(searchData);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const searchSuggest = createAsyncThunk('search/suggestKeyword', async (searchQuery, thunkAPI) => {
  try {
    const response = await searchAPI.searchSuggest(searchQuery);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const subjectTopic = createAsyncThunk('search/subjectTopic', async (searchTopic, thunkAPI) => {
  try {
    const response = await searchAPI.subjectTopic(searchTopic);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const ccsTopic = createAsyncThunk('search/ccsTopic', async (searchTopic, thunkAPI) => {
  try {
    const response = await searchAPI.ccsTopic(searchTopic);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: (state, action) => {
      state.suggestKeyword = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // Search Text Workybook List cases
      .addCase(search.pending, (state, action) => {
        state.isSearchResultLoading = true;
      })
      .addCase(search.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.isSearchResultLoading = false;
        state.isSuccess = true;
        state.searchData = action.payload;
      })
      .addCase(search.rejected, (state, action) => {
        // state.isLoading = false;
        state.isSearchResultLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.searchData = null;
      })
      .addCase(searchSuggest.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(searchSuggest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.suggestKeyword = action.payload;
      })
      .addCase(searchSuggest.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.suggestKeyword = null;
      })
      .addCase(subjectTopic.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(subjectTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.searchData = action.payload;
      })
      .addCase(subjectTopic.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.searchData = null;
      })
      .addCase(ccsTopic.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(ccsTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.searchData = action.payload;
      })
      .addCase(ccsTopic.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.searchData = null;
      });
  }
});

export const { reset } = searchSlice.actions;
export default searchSlice.reducer;
