import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  AdFor24HoursApi,
  deleteProductAdApi,
  fetchSinglePost,
  getAllProuctsAdsApi,
  updatePostText,
} from "../redux/apiCalls/postApiCall";
import DiscountProductAd24Hours from "./DiscountProductAd24Hours";

const UpdatePost = ({ toggle, settoggle, id }) => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);

  const { categories } = useSelector((state) => state.category);
  const [title, settitle] = useState();
  const [description, setdescription] = useState();
  const [category, setcategory] = useState();
  const [price, setprice] = useState();
  const [dicountMount, setdiscountMount] = useState();
  const [discoutTime, setDiscoutTime] = useState("");
  const [changePrice, setchangePrice] = useState();

  const { postsAd } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getAllProuctsAdsApi());
  }, []);

  const myAd = postsAd.filter(
    (item) => item?.order?._id === "68ca8361ca7a857600bdd94d"
  );
  console.log(myAd[0]?._id);
  const clearDiscountHandler = async (productId) => {
    const myAd = postsAd.filter((item) => item?.order?._id === productId);
    const adId = myAd[0]?._id;
    try {
      if (!post?.oldPrice || post.oldPrice.length === 0) {
        toast.info("No discount to clear");
        return;
      }

      const originalPrice = post.oldPrice[0];

      const payload = {
        price: originalPrice,
        oldPrice: [],
      };

      await dispatch(updatePostText(payload, post._id));
      await dispatch(fetchSinglePost(post._id));
      await dispatch(deleteProductAdApi(adId));

      toast.success("Discount cleared successfully");

      // تصفير الحالات المحلية
      setdiscountMount("");
      setDiscoutTime("");
      setchangePrice("");
    } catch (err) {
      console.error(err);
      toast.error("Error clearing discount");
    }
  };

  const updatePost = async (e) => {
    e.preventDefault();

    try {
      // helpers
      const isNonEmpty = (v) =>
        typeof v === "string"
          ? v.trim().length > 0
          : v !== undefined && v !== null;

      // الحقول المدخلة من الفورم (قد تكون فارغة)
      const newTitle = isNonEmpty(title) ? title.trim() : undefined;
      const newDescription = isNonEmpty(description)
        ? description.trim()
        : undefined;
      const newCategory = isNonEmpty(category) ? category.trim() : undefined;

      // السعر: إذا المستخدم أدخل سعر جديد نستخدمه، وإلا نستخدم السعر الحالي أو متغير changePrice إذا تستخدمه
      const priceProvided =
        price !== "" &&
        price !== undefined &&
        price !== null &&
        !isNaN(Number(price));
      const basePrice = priceProvided
        ? Number(price)
        : typeof changePrice !== "undefined" && changePrice !== null
        ? Number(changePrice)
        : Number(post?.price);

      // خصم
      const discount = parseFloat(dicountMount);
      const hasValidDiscount =
        !isNaN(discount) && discount >= 5 && discount <= 100;

      // منع الخصم على المنتجات البريميوم
      if (hasValidDiscount && post?.premium) {
        toast.error("لا يمكن وضع خصم على منتجات الـ premium");
        return;
      }

      // بناء سعر الحفظ و oldPrice بحسب حالة الخصم أو تغيير السعر
      let priceToSave;
      let oldPriceForPayload;
      const priceChangedByUser =
        priceProvided && Number(post?.price) !== Number(price);

      if (hasValidDiscount) {
        // مثال حسابي: basePrice = 100, discount = 10 => priceToSave = 100 - (100*10)/100 = 90
        priceToSave = +(basePrice - (basePrice * discount) / 100).toFixed(2);
        // نحفظ السعر الأصلي + نسبة الخصم
        oldPriceForPayload = [Number(post?.price ?? basePrice), discount];
        if (discoutTime == "oneday") {
          dispatch(AdFor24HoursApi(post));
        }
      } else if (priceChangedByUser) {
        priceToSave = basePrice;
        oldPriceForPayload = [];
      }

      // if (hasValidDiscount) {
      //   priceToSave = +(basePrice - (basePrice * discount) / 100).toFixed(2);
      //   oldPriceForPayload = [basePrice, discount];

      //   if (discoutTime === "oneday") {
      //     dispatch(AdFor24HoursApi(post));
      //   }
      // } else if (priceChangedByUser) {
      //   priceToSave = basePrice;
      //   oldPriceForPayload = []; // مسح أي خصم سابق
      // }

      // جهّز البايلود — فقط الحقول اللي تغيّرت
      const payload = {};
      if (newTitle !== undefined && newTitle !== post?.title)
        payload.title = newTitle;
      if (newDescription !== undefined && newDescription !== post?.description)
        payload.description = newDescription;
      if (newCategory !== undefined && newCategory !== post?.category)
        payload.category = newCategory;
      if (typeof priceToSave !== "undefined") {
        payload.price = priceToSave;
        payload.oldPrice = oldPriceForPayload;
      }

      // لو ما فيه تغييرات حقيقية
      if (Object.keys(payload).length === 0) {
        toast.info("لا يوجد تغييرات لحفظها");
        settoggle(false);
        return;
      }

      // نفّذ التحديث
      await dispatch(updatePostText(payload, post._id));
      toast.success("Product has been updated");

      // بدلاً من عمل window.location.reload() ننفّذ fetch للبوست المحدث أو نحدّث الستور
      await dispatch(fetchSinglePost(post._id)); // إن كان متوفر عندك ليعيد جلب البوست
      settoggle(false);
    } catch (err) {
      console.error(err);
      toast.error("حصل خطأ أثناء التحديث");
    }
  };

  const discountAmount = [0, 5, 10, 15, 20, 25, 50, 75];
  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [id]);
  console.log(changePrice);
  return (
    <Main>
      <div
        className="modal"
        tabindex="-1"
        style={toggle ? { display: "block" } : { display: "none" }}
      >
        <div
          className="modal-dialog"
          style={{ animation: "fade 0.5s", marginTop: "70px" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Post</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => settoggle(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-form" onSubmit={updatePost}>
                <input
                  type="text"
                  placeholder="title"
                  className="input"
                  onChange={(e) => settitle(e.target.value)}
                  value={title}
                />
                <select
                  className="input"
                  onChange={(e) => setcategory(e.target.value)}
                  value={category}
                >
                  <option value={null}>Change Category</option>
                  {categories.map((item) => (
                    <option value={item?.branchTitle}>
                      {item?.branchTitle}
                    </option>
                  ))}
                </select>

                <textarea
                  onChange={(e) => setdescription(e.target.value)}
                  value={description}
                  className="input"
                  placeholder="description"
                  rows="5"
                ></textarea>
                {post?.oldPrice?.length > 0 && (
                  <button
                    type="button"
                    className="btn btn-danger rounded-pill"
                    onClick={() => clearDiscountHandler(post?._id)}
                  >
                    Clear Discount
                  </button>
                )}
                {post?.oldPrice?.length > 0 && (
                  <p className="text-danger">
                    Current discount: {post.oldPrice[1]}%
                  </p>
                )}

                <h5>create discount for the product</h5>
                <select
                  className="input"
                  onChange={(e) => setdiscountMount(e.target.value)}
                  value={dicountMount}
                  disabled={post?.oldPrice?.length > 0 || changePrice}
                >
                  {discountAmount.map((item) => (
                    <option value={item}>{item} %</option>
                  ))}
                </select>
                {dicountMount && (
                  <>
                    <h5 className="text-danger">this discount for :</h5>
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center me-3">
                        <input
                          onChange={(e) => setDiscoutTime("oneday")}
                          type="radio"
                          name="plan"
                          id="oneday"
                          className="me-2"
                        />
                        <label htmlFor="oneday">one day</label>
                      </div>
                      <div className="d-flex align-items-center">
                        <input
                          onChange={(e) => setDiscoutTime("permanently")}
                          type="radio"
                          name="plan"
                          id="permanently"
                          className="me-2"
                        />
                        <label htmlFor="permanently">permanently</label>
                      </div>
                    </div>
                  </>
                )}
                <h5>or change the price</h5>
                <input
                  type="number"
                  placeholder="product price"
                  className="input"
                  onChange={(e) => setchangePrice(e.target.value)}
                  // value={Math.trunc(price)}
                  disabled={dicountMount}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rounded-pill"
                data-bs-dismiss="modal"
                onClick={() => settoggle(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success rounded-pill"
                onClick={updatePost}
              >
                Update Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
const Main = styled.div`
  //   & .modal-dialog {
  //     animation: fade 0.5s;
  //   }
  & .my-form {
    display: flex;
    flex-direction: column;
    & .input {
      padding: 5px;
      border-radius: 6px;
      border: 1px solid #ccc;
      outline: none;
      display: block;
      width: 100%;
      resize: none;
      margin-bottom: 10px;
    }
  }
`;
export default UpdatePost;

// const updatePost = async (e) => {
//   e.preventDefault();

//   try {
//     // نجهز الـ payload (الحقول التي تغيرت فقط)
//     const payload = {};

//     if (title && title !== post?.title) {
//       payload.title = title.trim();
//     }
//     if (description && description !== post?.description) {
//       payload.description = description.trim();
//     }
//     if (category && category !== post?.category) {
//       payload.category = category.trim();
//     }

//     // السعر والخصم
//     const discount = parseFloat(dicountMount);
//     const hasValidDiscount = !isNaN(discount) && discount >= 5 && discount <= 100;

//     if (hasValidDiscount && post?.premium) {
//       return toast.error("لا يمكن وضع خصم على منتجات الـ premium");
//     }

//     if (hasValidDiscount) {
//       const newPrice = price - (price * discount) / 100;
//       payload.price = newPrice;
//       payload.oldPrice = [post?.price, discount];
//     } else if (price && price !== post?.price) {
//       payload.price = price;
//       payload.oldPrice = [];
//     }

//     // لو ما فيه تغييرات
//     if (Object.keys(payload).length === 0) {
//       toast.info("لا يوجد تغييرات لحفظها");
//       settoggle(false);
//       return;
//     }

//     // إرسال التحديث
//     await dispatch(updatePostText(payload, post._id));
//     toast.success("تم التحديث بنجاح");

//     // تحديث الواجهة بدون reload
//     settoggle(false);
//     await dispatch(fetchSinglePost(post._id));

//   } catch (err) {
//     console.error(err);
//     toast.error("حدث خطأ أثناء التحديث");
//   }
// };
