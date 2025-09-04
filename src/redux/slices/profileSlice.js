import { createSlice } from "@reduxjs/toolkit";
const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    loading: false,
    isProfileDeleted: false,
    usersCount: null,
    profiles: [],
    location: [],
    orders: [],
    sliceRate: null,
  },
  reducers: {
    setprofile(state, action) {
      state.profile = action.payload;
    },
    setprofilePhoto(state, action) {
      state.profile.profilePhoto = action.payload;
    },
    // setProfile(state, action) {
    //   state.profile = action.payload;
    // },
    setloading(state) {
      state.loading = true;
    },
    clearLoaing(state) {
      state.loading = false;
    },
    setIsPostDeleted(state) {
      state.isProfileDeleted = true;
      state.loading = false;
    },
    clearisPostDeleted(state) {
      state.isProfileDeleted = false;
    },
    setUsersCount(state, action) {
      state.usersCount = action.payload;
    },
    setProfiles(state, action) {
      state.profiles = action.payload;
    },
    setlocation(state, action) {
      state.location = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setLikes(state, action) {
      state.profile.likes = action.payload.likes;
    },
    setDislikes(state, action) {
      state.profile.dislikes = action.payload.dislikes;
    },
    setRete(state, action) {
      state.profile.rate = action.payload.rate;
    },
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileReducer, profileActions };
