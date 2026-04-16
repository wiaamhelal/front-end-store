import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    // user: localStorage.getItem("userInfo")
    //   ? JSON.parse(localStorage.getItem("userInfo"))
    //   : null,

    user: {
      email: "wiaamhilal3@gmail.com",
      isAccountVerified: true,
      isAdmin: true,
      profilePhoto: {
        url: "https://t4.ftcdn.net/jpg/05/18/41/91/360_F_518419158_yXXBww2r5Z3XoutBxRX8KHNZOpPjhC03.jpg",
        publicId: "uz4fi2lh2dvpgi3wqmgk",
      },
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZTBiYjJlZmM4YjRjMDA0ZDZiY2Q3YyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc3NjM0NzU5OX0.B3rU1FbHb_nq_Vvc0YmU8lRNiwI_IaYqSYLivPiYBdk",
      username: "Test",
      _id: "69e0bb2efc8b4c004d6bcd7c",
    },

    registerMessage: "",
    isEmailVerified: false,
    loadingApp: false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.registerMessage = null;
    },
    logout(state, action) {
      state.user = null;
    },
    register(state, action) {
      state.registerMessage = action.payload;
    },
    setUserImage(state, action) {
      state.user.profilePhoto = action.payload;
    },
    updateUsername(state, action) {
      state.user.username = action.payload;
    },
    setisEmailVerified(state) {
      state.isEmailVerified = true;
      state.registerMessage = null;
    },
    setLoadingApp(state, action) {
      state.action = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer };
