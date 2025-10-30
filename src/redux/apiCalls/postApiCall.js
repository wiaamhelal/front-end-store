import request from "../../utils/request";
import { toast } from "react-toastify";
import { postActions } from "../slices/postSlice";

// get all posts by page number
export function fetchPosts(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// get all posts by page number
export function fetchMaxPosts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/max-posts`);
      dispatch(postActions.setMaxPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// get post count
export function getPostsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/count`);
      dispatch(postActions.setPostsCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// get post by the category
export function fetchPostsByCategory(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?category=${category}`);
      dispatch(postActions.setPostsCate(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// get post by the category
export function createNewPost(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading(true));
      await request.post(`/api/posts`, newPost, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(postActions.setIsPostCreated());
      setTimeout(() => dispatch(postActions.falseIsPostCreated()), 2000);
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.setLoading(false));
    }
  };
}

// fetch single post
export function fetchSinglePost(postId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${postId}`);
      dispatch(postActions.setpost(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// toggle like
export function toggleLike(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setLikes(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// toggle dislike
export function toggleDislike(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/posts/dislike/${postId}`,
        {},
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setDislikes(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// update post image
export function updatePostImage(newImage, postId) {
  return async (dispatch, getState) => {
    try {
      await request.put(`/api/posts/update-image/${postId}`, newImage, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("the image has been upladed");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// updtate post
export function updatePostText(newPost, postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/${postId}`, newPost, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.setPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// updtate post
export function deletePostApi(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: "bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.setPosts(data.postId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// get all posts
export function fetchAllPosts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/`);
      dispatch(postActions.setPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// set new order
export function createNewOrderApi(newOrder) {
  return async (dispatch, getState) => {
    try {
      await request.post(`/api/orders/my-orders`, newOrder, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.setOrders(newOrder));
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.setLoading(false));
    }
  };
}

// get all orders
export function getAllOrdersApi(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(
        `/api/orders/my-orders?pageNumber=${pageNumber}`
      );
      dispatch(postActions.setOrders(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// updtate order status
export function updateOrderStatusApi(newOrder, orderId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/orders/my-orders/${orderId}`,
        newOrder,
        {
          headers: {
            Authorization: "bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setOrders(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// get orders count
export function getOrdersCountApi() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/orders/count`);
      dispatch(postActions.setOrdersCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// get max all orders
export function getMaxAllOrdersApi() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/orders/all-orders`);
      dispatch(postActions.setAllOrders(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// creat new retun order
export function createNewReturnOrderApi(newOrder) {
  return async (dispatch, getState) => {
    try {
      await request.post(`/api/orders/return-order`, newOrder, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
          "Content-Type": "multipart/form-data",
        },
      });
      // dispatch(postActions.setReturnOrders(newOrder));
    } catch (error) {
      console.error("API Error:", error.response || error.message || error);
      toast.error(error?.response?.data?.message || "حدث خطأ غير متوقع");
      dispatch(postActions.setLoading(false));
    }
  };
}

// get max all returned orders
export function getRetunedOrdersApi() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(
        `/api/orders/return-order`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.setReturnOrders(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// send email confrirm return
export function sendEmailCinfirmReturnApi(info) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/orders/approve-return`, info, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      toast.success(data.message);
      // dispatch(postActions.setReturnOrders(newOrder));
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.setLoading(false));
    }
  };
}

export function sendEmailRejectReturnApi(info) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/orders/reject-return`, info, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      toast.success(data.message);
      // dispatch(postActions.setReturnOrders(newOrder));
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch(postActions.setLoading(false));
    }
  };
}

// create ad api
export function createAdProductApi(newad) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading(true));
      const { data } = await request.post(
        `/api/posts/create-product-ad`,
        newad,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            // "Content-Type": "multipart/form-data",
          },
        }
      );

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
export function getAllProuctsAdsApi() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/get-product-ad`);
      dispatch(postActions.setPostsAd(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data);
    }
  };
}

// delete ad
export function deleteProductAdApi(adId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/delete-ad/${adId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.deletePostad(data.adId));
      toast.success("ad has been deleted");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// create ad api (24 hours)
export function AdFor24HoursApi(newad) {
  return async (dispatch, getState) => {
    try {
      dispatch(postActions.setLoading(true));
      const { data } = await request.post(`/api/posts/ad-for-24hours`, newad, {
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
export function getAllProuctsAds24hoursApi() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/get-product-ad-24hours`);
      dispatch(postActions.setadFor24Hours(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data);
    }
  };
}

// // updtate order status
// export function paymentOrderApi(newOrder, orderId) {
//   return async (dispatch, getState) => {
//     try {
//       const { data } = await request.put(
//         `/api/orders/payment/${orderId}`,
//         newOrder,
//         {
//           headers: {
//             Authorization: "bearer " + getState().auth.user.token,
//           },
//         }
//       );
//       dispatch(postActions.setAllOrders(data));
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };
// }

export function paymentOrderApi(newOrder, orderId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/orders/payment/${orderId}`,
        newOrder,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      toast.success("تم تحديث حالة الدفع بنجاح ✅");
      dispatch(postActions.setPayment(data.order)); // إعادة تحميل الطلبات بعد التحديث
      console.log("Updated order from server:", data.order);
      await dispatch(getMaxAllOrdersApi());
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء التحديث");
    }
  };
}

export function closingOrdersApi(products) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/orders/create-closing`,
        products,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      toast.success("the closing has been done successfuly✅");
      console.log("Updated order from server:", data);
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء التحديث");
    }
  };
}

export function getAllClosingOrdersApi() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/orders/create-closing`);
      dispatch(postActions.setClosingOrders(data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data);
    }
  };
}
