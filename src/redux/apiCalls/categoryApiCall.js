import { categoryActions } from "../slices/categorySlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import { postActions } from "../slices/postSlice";

// fitch all categories
export function fitchAllCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/category");
      dispatch(categoryActions.setCategories(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// add category
// export function addCategoryApi(newCategory) {
//   return async (dispatch, getState) => {
//     try {
//       const { data } = await request.post("/api/category", newCategory, {
//         headers: {
//           Authorization: "Bearer " + getState().auth.user.token,
//         },
//       });
//       dispatch(categoryActions.addCategory(data));
//       toast.success("category has been added successfuly");
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };
// }

// delete category
export function deleteCategoryApi(categoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/category/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.deleteCategory(data.categoryId));
      toast.success("category has been deleted");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// get post by the category
export function createNewCateApi(newcate) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading(true));
      const { data } = await request.post(`/api/category`, newcate, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(categoryActions.addCategory(data));
      toast.success("category has been added successfuly");
      dispatch(postActions.setIsPostCreated());
      setTimeout(() => dispatch(postActions.falseIsPostCreated()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.setLoading(false));
    }
  };
}

// get post by the category
export function createExistCateApi(newcate) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading(true));
      const { data } = await request.post(`/api/category/exist`, newcate, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(categoryActions.addCategory(data));
      toast.success("category has been added successfuly");
      dispatch(postActions.setIsPostCreated());
      setTimeout(() => dispatch(postActions.falseIsPostCreated()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.setLoading(false));
    }
  };
}

// create ad api
export function createadApi(newad) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading(true));
      const { data } = await request.post(`/api/category/createad`, newad, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          // "Content-Type": "multipart/form-data",
        },
      });

      toast.success("the ad has been added successfuly");
      dispatch(postActions.setIsPostCreated());
      setTimeout(() => dispatch(postActions.falseIsPostCreated()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.setLoading(false));
    }
  };
}

// fitch all ads
export function getAllAdsApi() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/category/createad");
      dispatch(categoryActions.setProductad(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// delete ad
export function deleteAdApi(adId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/category/createad/${adId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.deletead(data.adId));
      toast.success("ad has been deleted");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
