import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addCategoryApi,
  fitchAllCategories,
  getAllAdsApi,
} from "../redux/apiCalls/categoryApiCall";
import { getUsersCountApi } from "../redux/apiCalls/profileApiCall";
import {
  getMaxAllOrdersApi,
  getPostsCount,
  getRetunedOrdersApi,
} from "../redux/apiCalls/postApiCall";
import {
  AllCommentsClintsApi,
  fetshAllCommentsApi,
} from "../redux/apiCalls/commentApiCall";
import { styled } from "styled-components";
import returnIcon from "../img/returnOrder.svg";
import cateIcon from "../img/category-svgrepo-com (1).svg";
import commentIcon from "../img/comments-svgrepo-com.svg";
import salesImg from "../img/sales-up-graph-svgrepo-com (1).svg";
import createProductIcon from "../img/create-dashboard-svgrepo-com.svg";
import discountimg from "../img/discount.svg";
import discountListPic from "../img/discount-label-svgrepo-com.svg";
import accountentPic from "../img/accounting-man-upper-body-svgrepo-com.svg";
import ownerPic from "../img/businessman-information-svgrepo-com.svg";

const MainDashboard = () => {
  const navicate = useNavigate();
  const { categories, productad } = useSelector((state) => state.category);
  const { usersCount } = useSelector((state) => state.profile);
  const { postsCount, ordersCount, allMaxOrders, returnOrdes } = useSelector(
    (state) => state.post
  );
  const { comments, clinetComments } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const {} = useSelector((state) => state.comment);
  useEffect(() => {
    dispatch(fitchAllCategories());
    dispatch(getUsersCountApi());
    dispatch(getPostsCount());
    dispatch(fetshAllCommentsApi());
    dispatch(getRetunedOrdersApi());
    dispatch(AllCommentsClintsApi());
    dispatch(getMaxAllOrdersApi());
    dispatch(getAllAdsApi());
  }, []);
  // useEffect(() => {
  //   dispatch(getRetunedOrdersApi());
  // }, [HandleSubmit()]);
  const [title, settitle] = useState("");

  const [catetoggle, setcatetoggle] = useState(false);
  const [adToggle, setadToggle] = useState(false);
  const [productToggle, setProductToggle] = useState(false);
  return (
    <div>
      <div className=" row justify-content-center gap-3">
        <div className="col-12 col-sm-6 col-md-3 p-3 shadow rounded bg-white">
          <div className="d-flex align-itmes-center justify-content-between">
            <h4>Users</h4>
            <h5>{usersCount}</h5>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src="https://cdn-icons-png.freepik.com/512/9196/9196300.png"
              style={{ width: "100px", marginBottom: "10px" }}
              alt=""
            />
          </div>
          <Link
            to="/dashboard/user-table"
            className="btn btn-success btn-sm  w-100 fw-bold"
          >
            see all users
          </Link>{" "}
        </div>
        <div className="col-12 col-sm-6 col-md-3 p-3 shadow rounded bg-white">
          <div className="d-flex align-itmes-center justify-content-between">
            <h4>Products</h4>
            <h5>{postsCount}</h5>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src="https://icons.veryicon.com/png/o/application/applet-1/product-17.png"
              style={{ width: "100px", marginBottom: "10px" }}
              alt=""
            />
          </div>
          <Link
            to="/dashboard/posts-tabe"
            className="btn btn-success btn-sm w-100 fw-bold"
          >
            see all products
          </Link>{" "}
        </div>
        <div className="col-12 col-sm-6 col-md-3 shadow rounded p-3 bg-white">
          <div className="d-flex align-itmes-center justify-content-between">
            <h4>Categories</h4>
            <h5>{categories.length}</h5>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src="https://cdn3.iconfinder.com/data/icons/flat-pro-basic-set-3/32/internet-gray-512.png"
              style={{ width: "100px", marginBottom: "10px" }}
              alt=""
            />
          </div>
          <Link
            to="/dashboard/categories-tabe"
            className="btn btn-success btn-sm w-100 fw-bold"
          >
            see all categories
          </Link>{" "}
        </div>
        <div className="col-12 col-sm-6 col-md-3 shadow rounded p-3 bg-white">
          <div className="d-flex align-itmes-center justify-content-between">
            <h4>Product Comments</h4>
            <h5>{comments.length}</h5>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src="https://cdn-icons-png.freepik.com/512/9189/9189094.png"
              style={{ width: "100px", marginBottom: "10px" }}
              alt=""
            />
          </div>
          <Link
            to="/dashboard/comment-table"
            className="btn btn-success btn-sm w-100 fw-bold"
          >
            see all comments
          </Link>{" "}
        </div>
        <div className="col-12 col-sm-6 col-md-3 shadow rounded p-3 bg-white">
          <div className="d-flex align-itmes-center justify-content-between">
            <h4>Orders</h4>
            <h5>{allMaxOrders?.length}</h5>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk85S1onZP8-MbH6ru4coAJHmKMtDGiUds-w&s"
              style={{ width: "100px", marginBottom: "10px" }}
              alt=""
            />
          </div>
          <Link
            to="/dashboard/orders-status"
            className="btn btn-success btn-sm w-100 fw-bold"
          >
            Check orders status
          </Link>{" "}
        </div>
        <div className="col-12 col-sm-6 col-md-3 shadow rounded p-3 bg-white">
          <div className="d-flex align-itmes-center justify-content-between">
            <h4>return request</h4>
            <h5>{returnOrdes?.length}</h5>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={returnIcon}
              style={{ width: "100px", marginBottom: "10px" }}
              alt=""
            />
          </div>
          <Link
            to="/dashboard/retun-order"
            className="btn btn-success btn-sm w-100 fw-bold"
          >
            Check return requests
          </Link>{" "}
        </div>
        <div className="col-12 col-sm-6 col-md-3 shadow rounded p-3 bg-white">
          <div className="d-flex align-itmes-center justify-content-between">
            <h4>Create new cateogry</h4>
            {/* <h5>{returnOrdes?.length}</h5> */}
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={cateIcon}
              style={{ width: "100px", marginBottom: "10px" }}
              alt=""
            />
          </div>
          <Link
            // to="/create-category"
            className="btn btn-success btn-sm w-100 fw-bold"
            onClick={() => setcatetoggle(true)}
          >
            Create a category
          </Link>{" "}
        </div>
        <div className="col-12 col-sm-6 col-md-3 shadow rounded p-3 bg-white">
          <div className="d-flex align-itmes-center justify-content-between">
            <h4>Create new Product</h4>
            {/* <h5>{comments.length}</h5> */}
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={createProductIcon}
              style={{ width: "100px", marginBottom: "10px" }}
              alt=""
            />
          </div>
          <Link
            to="/create-post"
            className="btn btn-success btn-sm w-100 fw-bold"
          >
            Create a new product
          </Link>{" "}
        </div>
        <div className="col-12 col-sm-6 col-md-3 shadow rounded p-3 bg-white">
          <div className="d-flex align-itmes-center justify-content-between">
            <h4>Client Messages</h4>
            <h5>{clinetComments.length}</h5>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={commentIcon}
              style={{ width: "100px", marginBottom: "10px" }}
              alt=""
            />
          </div>
          <Link to="/messages" className="btn btn-success btn-sm w-100 fw-bold">
            see all Messages
          </Link>{" "}
        </div>
        <div className="col-12 col-sm-6 col-md-3 shadow rounded p-3 bg-white">
          <div className="d-flex align-itmes-center justify-content-between">
            <h4>our sales</h4>
            <h5>{allMaxOrders.length}</h5>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={salesImg}
              style={{ width: "100px", marginBottom: "10px" }}
              alt=""
            />
          </div>
          <Link
            to="/our-sales"
            className="btn btn-success btn-sm w-100 fw-bold"
          >
            see all sales
          </Link>{" "}
        </div>
        <div className="col-12 col-sm-6 col-md-3 shadow rounded p-3 bg-white">
          <div className="d-flex align-itmes-center justify-content-between">
            <h4>create new discount ad</h4>
            {/* <h5>{productad?.length}</h5> */}
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={discountimg}
              style={{ width: "100px", marginBottom: "10px" }}
              alt=""
            />
          </div>
          <Link
            // to="/create-discount-ad"
            onClick={() => setadToggle(true)}
            className="btn btn-success btn-sm w-100 fw-bold"
          >
            create discount ad
          </Link>{" "}
        </div>
        <div className="col-12 col-sm-6 col-md-3 shadow rounded p-3 bg-white">
          <div className="d-flex align-itmes-center justify-content-between">
            <h4>discount list</h4>
            <h5>{productad?.length}</h5>
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={discountListPic}
              style={{ width: "100px", marginBottom: "10px" }}
              alt=""
            />
          </div>
          <Link
            to="/discount-list"
            className="btn btn-success btn-sm w-100 fw-bold"
          >
            edit the discount list
          </Link>{" "}
        </div>
        <div className="col-12 col-sm-6 col-md-3 shadow rounded p-3 bg-white">
          <div className="d-flex align-itmes-center justify-content-between">
            <h4>Accountant Page</h4>
            {/* <h5>{productad?.length}</h5> */}
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={accountentPic}
              style={{ width: "100px", marginBottom: "10px" }}
              alt=""
            />
          </div>
          <Link
            to="/closing-page"
            className="btn btn-success btn-sm w-100 fw-bold"
          >
            Accountant Page
          </Link>{" "}
        </div>
        <div className="col-12 col-sm-6 col-md-3 shadow rounded p-3 bg-white">
          <div className="d-flex align-itmes-center justify-content-between">
            <h4>Owner Page</h4>
            {/* <h5>{productad?.length}</h5> */}
          </div>
          <div className="d-flex justify-content-center">
            <img
              src={ownerPic}
              style={{ width: "100px", marginBottom: "10px" }}
              alt=""
            />
          </div>
          <Link
            to="/closing-page"
            className="btn btn-success btn-sm w-100 fw-bold"
          >
            Owner Page
          </Link>{" "}
        </div>
      </div>
      {/* <div
        className="the-form shadow mt-5 p-3 rounded m-auto bg-white"
        style={{ maxWidth: "600px" }}
      >
        <h4 className="mb-4">add a new category</h4>
       
        <label htmlFor="category" className="fw-bold mb-2 text-secondary">
          category title
        </label>
        <input
          value={title}
          type="text"
          id="category"
          className="my-input"
          onChange={(e) => settitle(e.target.value)}
          name="title"
        />
        <button className="btn btn-success w-100 fw-bold btn-sm">add</button>
       
      </div> */}
      <UbdatePassword>
        <div
          className="modal align-items-center justify-content-center"
          tabindex="-1"
          style={
            catetoggle
              ? { display: "flex ", background: "#0000005e" }
              : { display: "none" }
          }
        >
          <div className="modal-dialog" style={{ animation: "fade 0.5s" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create A Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setcatetoggle(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className=" lh-md text-center">
                  if you have Exest Main Category Example (laptops) and you need
                  to make a branch for it like (gaming laptops) chose Exest
                  category , if you need to add a new main category with a
                  branch chose New Category{" "}
                </p>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-success rounded-pill"
                  data-bs-dismiss="modal"
                  onClick={() => navicate("/create-branch-category")}
                >
                  Exest categorie
                </button>
                <button
                  type="button"
                  className="btn btn-success rounded-pill"
                  onClick={() => navicate("/create-category")}
                >
                  New Category
                </button>
              </div>
            </div>
          </div>
        </div>
      </UbdatePassword>

      <UbdatePassword>
        <div
          className="modal align-items-center justify-content-center"
          tabindex="-1"
          style={
            adToggle
              ? { display: "flex ", background: "#0000005e" }
              : { display: "none" }
          }
        >
          <div className="modal-dialog" style={{ animation: "fade 0.5s" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create A New AD</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setadToggle(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className=" lh-md text-center">
                  Ad for 1 product or for hall categorie ?, Example if you have
                  range of discounts on your laptops chose category, if you have
                  a big discount for one product and you want to show it to the
                  custimers chose one product
                </p>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-success rounded-pill"
                  data-bs-dismiss="modal"
                  // onClick={() => navicate("/discount-product-ad")}
                  onClick={() => {
                    setadToggle(false);
                    setProductToggle(true);
                  }}
                >
                  One Product
                </button>
                <button
                  type="button"
                  className="btn btn-success rounded-pill"
                  onClick={() => navicate("/create-discount-ad")}
                >
                  Hall Category
                </button>
              </div>
            </div>
          </div>
        </div>
      </UbdatePassword>
      <UbdatePassword>
        <div
          className="modal align-items-center justify-content-center"
          tabindex="-1"
          style={
            productToggle
              ? { display: "flex ", background: "#0000005e" }
              : { display: "none" }
          }
        >
          <div className="modal-dialog" style={{ animation: "fade 0.5s" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  For one day , or unlimited time ?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setProductToggle(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p className=" lh-md text-center">
                  do you need the ad for one day or unlimited time (one day it
                  will delete after 24 hours)
                </p>
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-success rounded-pill"
                  data-bs-dismiss="modal"
                  onClick={() => navicate("/discount-product-ad-24hours")}
                >
                  One day
                </button>
                <button
                  type="button"
                  className="btn btn-success rounded-pill"
                  onClick={() => navicate("/discount-product-ad")}
                >
                  unlimited
                </button>
              </div>
            </div>
          </div>
        </div>
      </UbdatePassword>
    </div>
  );
};

const UbdatePassword = styled.div`
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

export default MainDashboard;
