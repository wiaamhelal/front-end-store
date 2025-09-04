import { createSlice } from "@reduxjs/toolkit";
const commentSlice = createSlice({
  name: "category",
  initialState: {
    comments: [],
    clinetComments: [],
  },
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    },
    deleteComment(state, action) {
      state.comments = state.comments.filter((c) => c._id !== action.payload);
    },
    setClinetComment(state, action) {
      state.clinetComments = action.payload;
    },
  },
});

const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;

export { commentReducer, commentActions };
