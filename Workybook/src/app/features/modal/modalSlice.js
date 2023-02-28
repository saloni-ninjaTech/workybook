import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    showCreateClassModal: false
  },
  reducers: {
    showCreateClass: (state) => {
      state.showCreateClassModal = true;
    },
    closeCreateClass: (state) => {
      state.showCreateClassModal = false;
    }
  }
});

export const { showCreateClass, closeCreateClass } = modalSlice.actions;
export default modalSlice.reducer;
