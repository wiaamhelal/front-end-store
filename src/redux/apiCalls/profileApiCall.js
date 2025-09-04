import { profileActions } from "../slices/profileSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";

// get user profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);
      dispatch(profileActions.setprofile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// change profile photo
export function changeProfilePhoto(newImage) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/profile/profile-photo-upload`,
        newImage,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(profileActions.setprofilePhoto(data.profilePhoto));
      dispatch(authActions.setUserImage(data.profilePhoto));
      toast.success(data.message);

      let user = JSON.parse(localStorage.getItem("userInfo"));
      user.profilePhoto = data.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// update profile
export function updateProfile(userId, newUpdate) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        newUpdate,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setProfile(data));
      dispatch(authActions.updateUsername(data.username));
      toast.success(data.message);

      let user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data.username;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// delete profile
export function deleteProfileApi(userId) {
  return async (dispatch, getState) => {
    try {
      dispatch(profileActions.setloading);
      const { data } = await request.delete(
        `/api/users/profile/${userId}`,

        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setIsPostDeleted());
      setTimeout(() => dispatch(profileActions.clearisPostDeleted()), 2000);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(profileActions.clearLoaing());
    }
  };
}

// get users Count
export function getUsersCountApi() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        `/api/users/count`,

        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setUsersCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// get all profiles
export function getAllProfilesApi() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        `/api/users/profile`

        // {
        //   headers: {
        //     Authorization: "Bearer " + getState().auth.user.token,
        //   },
        // }
      );
      dispatch(profileActions.setProfiles(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// set the location for the user
export function setUserLocationApi(userId, location) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/location/${userId}`,
        location,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setlocation(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// set the orders for the user
export function setUserOrdersApi(userId, orders) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/orders/${userId}`,
        orders,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setOrders(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// set the confirm order for the user
export function setConfirmOrderApi(userId) {
  return async (dispatch, getState) => {
    try {
      await request.get(
        `/api/users/confirm-order/${userId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// toggle like
export function toggleUserLikeApi(userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/user-like/${userId}`,
        {},
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setLikes(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// toggle dislike
export function toggleUserDisLikeApi(userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/user-dislike/${userId}`,
        {},
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setDislikes(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// toggle like
export function userRateApi(userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/user-rate/${userId}`,
        {}
        // {
        //   headers: {
        //     Authorization: "bearer " + getState().auth.user.token,
        //   },
        // }
      );
      dispatch(profileActions.setRete(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// change user auth
export function changeUserAuthApi(userId, isAdmin) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/user-auth/${userId}`,
        isAdmin,
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setProfiles(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
