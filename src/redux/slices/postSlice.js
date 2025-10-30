import { createSlice, current } from "@reduxjs/toolkit";
import formatCurrency from "../../components/FormatCurrency";
import { GetBasketTotal } from "../../App";
const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    maxPosts: [],
    postsCount: null,
    postsCate: [],
    loading: false,
    isPostCreated: false,
    post: null,
    // likes: [],
    // dislikes:[],
    basket: [],
    orderDate: "",
    search: "",
    orders: [],
    allMaxOrders: [],
    ordersCount: null,
    returnOrdes: [],
    postsAd: [],
    adsFor24Hours: [],
    totalPrice: null,
    payment: "",
    ClosingOrders: [],
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setPostsCount(state, action) {
      state.postsCount = action.payload;
    },
    setPostsCate(state, action) {
      state.postsCate = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setIsPostCreated(state) {
      state.isPostCreated = true;
      state.loading = false;
    },
    falseIsPostCreated(state) {
      state.isPostCreated = false;
    },
    setpost(state, action) {
      state.post = action.payload;
    },
    setLikes(state, action) {
      state.post.likes = action.payload.likes;
    },
    setDislikes(state, action) {
      state.post.dislikes = action.payload.dislikes;
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    setNewComment(state, action) {
      state.post.comments.push(action.payload);
    },
    updateComment(state, action) {
      state.post.comments = state.post.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
    deleteCommentFromPost(state, action) {
      const myComment = state.post.comments.find(
        (comment) => comment._id === action.payload
      );
      const commentIndex = state.post.comments.indexOf(myComment);
      state.post.comments.splice(commentIndex, 1);
    },
    setbasket(state, action) {
      state.basket.push(action.payload);
    },
    deleteBasketItem: (state, action) => {
      let newbasket = state.basket;
      const index = state.basket.findIndex(
        (item) => item.id === action.payload
      );
      if (index >= 0) {
        newbasket.splice(index, 1);
      }
      state.basket = newbasket;
    },
    clearBasket: (state, action) => {
      state.basket = [];
    },
    setOrderDate(state, action) {
      state.orderDate = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setAllOrders(state, action) {
      state.allMaxOrders = action.payload;
    },
    setOrdersCount(state, action) {
      state.ordersCount = action.payload;
    },
    setMaxPosts(state, action) {
      state.maxPosts = action.payload;
    },
    setReturnOrders(state, action) {
      state.returnOrdes = action.payload;
    },
    setPostsAd(state, action) {
      state.postsAd = action.payload;
    },
    setadFor24Hours(state, action) {
      state.adsFor24Hours = action.payload;
    },
    deletePostad(state, action) {
      state.postsAd = state.postsAd.filter((c) => c._id !== action.payload);
    },
    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
    // state.payment = action.payload;
    // state.allMaxOrders.map((item) =>
    //   item._id === action.payload._id ? action.payload : item
    // );
    // state.orders = action.payload;

    // const updatedOrder = action.payload;
    // const index = state.allMaxOrders.findIndex(
    //   (order) => order._id === updatedOrder._id
    // );
    // if (index !== -1) {
    //   // تحديث الطلب داخل المصفوفة
    //   state.allMaxOrders[index] = updatedOrder;
    // }
    // setPayment: (state, action) => {
    //   const updatedOrder = action.payload;

    //   // تحديث الطلب داخل مصفوفة الطلبات
    //   const index = state.orders.findIndex((o) => o._id === updatedOrder._id);
    //   if (index !== -1) {
    //     state.orders[index] = updatedOrder;
    //   }

    //   // أو إذا عندك orders في مكان آخر (مثلاً allMaxOrders)
    //   const maxIndex = state.allMaxOrders?.findIndex(
    //     (o) => o._id === updatedOrder._id
    //   );
    //   if (maxIndex !== -1) {
    //     state.allMaxOrders[maxIndex] = updatedOrder;
    //   }
    // },
    // setPayment: (state, action) => {
    //   const updatedOrder = action.payload;

    //   // تحديث الطلب داخل orders
    //   const index = state.orders.findIndex((o) => o._id === updatedOrder._id);
    //   if (index !== -1) {
    //     state.orders[index] = updatedOrder;
    //   }

    //   // تحديث الطلب داخل allMaxOrders
    //   const maxIndex = state.allMaxOrders?.findIndex(
    //     (o) => o._id === updatedOrder._id
    //   );
    //   if (maxIndex !== -1) {
    //     state.allMaxOrders[maxIndex] = updatedOrder;
    //   }

    //   // في حال لم يكن موجود (احتياط)
    //   if (index === -1 && maxIndex === -1) {
    //     state.allMaxOrders.unshift(updatedOrder);
    //   }
    // },

    setPayment: (state, action) => {
      const updatedOrder = action.payload;

      console.log("قبل التحديث:", current(state.allMaxOrders));

      const idx = state.allMaxOrders.findIndex(
        (o) => o._id === updatedOrder._id
      );
      console.log(idx);
      if (idx !== -1) {
        // نستبدل العنصر الموجود
        state.allMaxOrders[idx] = updatedOrder;
      } else {
        // إذا لم يكن موجودًا، نضيفه في البداية (اختياري)
        state.allMaxOrders.unshift(updatedOrder);
      }
      console.log("بعد التحديث:", current(state.allMaxOrders));
    },
    setClosingOrders: (state, action) => {
      state.ClosingOrders = action.payload;
    },
  },
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export { postReducer, postActions };
