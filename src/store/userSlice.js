import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    autherized: false,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      state.autherized = true;
    },
    removeUser: (state) => {
      state.user = null;
      state.autherized = false;
    },
    isAutherized: (state,action) => {
      state.autherized = action.payload;
    },
  },
});

export const { addUser, removeUser,isAutherized } = userSlice.actions;
export default userSlice.reducer;
