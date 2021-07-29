import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isLoading: false,
  error: '',
}


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUserPending: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
      state.error = '';
    },
    getUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const { reducer, actions } = usersSlice;

export const { getUserPending, getUserSuccess, getUserFail } = actions;

export default reducer;
