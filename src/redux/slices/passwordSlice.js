import { createSlice } from "@reduxjs/toolkit";
const passwordSlice = createSlice({
  name: "category",
  initialState: {
    isError: false,
    sucResPass: false,
  },
  reducers: {
    setError(state) {
      state.isError = true;
    },
    clearError(state) {
      state.isError = false;
    },
    setsucResPass(state, action) {
      state.sucResPass = action.payload;
    },
  },
});

const passwordReducer = passwordSlice.reducer;
const passwordActions = passwordSlice.actions;

export { passwordReducer, passwordActions };
