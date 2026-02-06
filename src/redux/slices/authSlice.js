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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZmY5MzJkODk2MjczY2UxOWYyMjcxZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTc0NTQ5MTU4NX0.hFyA08nglUKRG5GCnHSjEQpjlw625GBE3i5Zk98MOq4",
      username: "Test",
      _id: "67ff932d896273ce19f2271d",
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
