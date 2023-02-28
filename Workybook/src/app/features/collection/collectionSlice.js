import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import collectionAPI from '../../api/collectionApi';

const initialState = {
  collections: null,
  favoriteCollections: null,
  currentCollection: null,
  selectedCollections: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const getCollections = createAsyncThunk('library/getCollections', async (data, thunkAPI) => {
  try {
    const response = await collectionAPI.getCollections(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getFavoriteCollections = createAsyncThunk('library/getFavoriteCollections', async (thunkAPI) => {
  try {
    const response = await collectionAPI.getFavoriteCollections();
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getCollection = createAsyncThunk('library/getCollection', async (data, thunkAPI) => {
  try {
    const response = await collectionAPI.getCollection(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createCollection = createAsyncThunk('collection/createCollection', async (data, thunkAPI) => {
  try {
    const response = await collectionAPI.createCollection(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateCollection = createAsyncThunk('collection/updateCollection', async (data, thunkAPI) => {
  try {
    const response = await collectionAPI.updateCollection(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateCollectionLike = createAsyncThunk('collection/updateCollectionLike', async (data, thunkAPI) => {
  try {
    const response = await collectionAPI.updateCollectionLike(data);
    return response;
  } catch (error) {
    const message = (error.response && error.response.data && error.response.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    selectCollection(state, action) {
      state.selectedCollections = [...state.selectedCollections, action.payload];
    },
    unSelectCollection(state, action) {
      state.selectedCollections = state.selectedCollections.filter((c) => c !== action.payload);
    },
    resetSelectedCollections(state) {
      state.selectedCollections = [];
    },
    setCurrentCollection(state, action) {
      state.currentCollection = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.collections = action.payload;
      })
      .addCase(getCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.collections = null;
      })
      .addCase(getFavoriteCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavoriteCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favoriteCollections = action.payload;
      })
      .addCase(getFavoriteCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.favoriteCollections = null;
      })
      .addCase(getCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentCollection = action.payload;
      })
      .addCase(getCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currentCollection = null;
      })
      .addCase(createCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentCollection = action.payload;
      })
      .addCase(createCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currentCollection = null;
      })
      // update workybook list
      .addCase(updateCollection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentCollection = action.payload;
      })
      .addCase(updateCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currentCollection = null;
      })
      // update workybook list likes
      .addCase(updateCollectionLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCollectionLike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentCollection = action.payload;
      })
      .addCase(updateCollectionLike.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currentCollection = null;
      });
  }
});

export const { reset, selectCollection, unSelectCollection, resetSelectedCollections, setCurrentCollection } = collectionSlice.actions;
export default collectionSlice.reducer;
