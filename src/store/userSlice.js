import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAutherized: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.isAutherized = true;
    },
    removeUser: (state) => {
      state.user = null;
      state.isAutherized = false;
    },
    isAutherized: (state) => {
      return state.isAutherized;
    },
  },
});

export const { addUser, removeUser,isAutherized } = userSlice.actions;
export default userSlice.reducer;
