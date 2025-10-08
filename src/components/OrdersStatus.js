import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BasketItem from "./BasketItem";
import formatCurrency from "./FormatCurrency";
import moment from "moment/moment";
import { GetBasketTotal } from "../App";
import {
  getUserProfile,
  setUserOrdersApi,
} from "../redux/apiCalls/profileApiCall";
import {
  getAllOrdersApi,
  getMaxAllOrdersApi,
  getOrdersCountApi,
  updateOrderStatusApi,
} from "../redux/apiCalls/postApiCall";
import Paganation from "./Paganation";
import { Link } from "react-router-dom";

const OrdersStatus = () => {
  const { orders, ordersCount, allMaxOrders, totalPrice } = useSelector(
    (state) => state.post
  );

  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const [orderStatus, setorderStatus] = useState("");
  useEffect(() => {
    dispatch(getUserProfile(user._id));
    dispatch(getOrdersCountApi());
  }, []);
  const dispatch = useDispatch();

  const POST_PER_PAGE = 8;
  const [search, setsearch] = useState("");

  const [currentPage, setcurrentPage] = useState(1);
  const pages = Math.ceil(ordersCount / POST_PER_PAGE);
  let status = orders;
  useEffect(() => {
    dispatch(getAllOrdersApi(currentPage));
    dispatch(getMaxAllOrdersApi());
    if (search !== "") {
      status = allMaxOrders;
    }
  }, [currentPage, search]);

  const submitSerch = () => {
    // e.preventDefault();
    status = [];
    status = allMaxOrders;
  };

  const submitStatus = async (item) => {
    await dispatch(
      updateOrderStatusApi({ orderStatus: orderStatus }, item._id)
    );
    window.location.reload(false);
  };

  return (
    <Holder>
      {orders ? (
        <Main className="container">
          <Comments>
            <form>
              {" "}
              <input
                type="text"
                placeholder="inter order ID"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
              <button onClick={submitSerch}>Search</button>
            </form>
          </Comments>
          <div>
            {(search === "" ? orders : allMaxOrders)
              ?.filter((item) =>
                search == ""
                  ? item?._id
                  : item?._id?.toLowerCase()?.includes(search)
              )
              .map((item) => (
                <div className="order-item">
                  <BasketItem {...item?.orderDetails[0]} />
                  {item?.orderDetails[1] && (
                    <BasketItem {...item?.orderDetails[1]} />
                  )}
                  {item?.orderDetails[2] && (
                    <BasketItem {...item?.orderDetails[2]} />
                  )}
                  {item?.orderDetails[3] && (
                    <BasketItem {...item?.orderDetails[3]} />
                  )}
                  <h4 className="fw-bold text-secondary mt-4">
                    Order ID : {item?._id}
                  </h4>
                  <h4 className="fw-bold text-secondary mt-4">
                    Total Price :{" "}
                    {/* {formatCurrency(GetBasketTotal(item?.orderDetails))} */}
                    {totalPrice}
                  </h4>
                  <h4 className="fw-bold text-secondary mt-4">
                    Order Time :{" "}
                    {moment(item?.createdAt).format("MMMM DD  h:mma")}
                  </h4>
                  <div className="d-flex align-items-center mt-4">
                    <h4 className="fw-bold text-secondary me-3">
                      order status:
                    </h4>
                    <div className="d-flex align-items-center">
                      <select
                        className="inputs m-0 me-3"
                        onChange={(e) => setorderStatus(e.target.value)}
                        disabled={
                          item?.orderStatus === "canceled" ||
                          item?.orderStatus === "receved"
                        }
                      >
                        <option value="none">confirm status</option>

                        <option value="confirmid">confirmid</option>
                        <option value="shipped">shipped</option>
                        <option value="on the way">on the way</option>
                        <option value="receved">receved</option>
                        <option
                          value="canceled"
                          disabled={item?.orderStatus === "confirmid"}
                        >
                          canceled
                        </option>
                      </select>
                      <button
                        onClick={() => submitStatus(item)}
                        className="btn btn-sm btn-success"
                        disabled={
                          item?.orderStatus === "receved" ||
                          item?.orderStatus === "canceled"
                        }
                      >
                        submit
                      </button>
                    </div>
                  </div>
                  {item?.orderStatus === "receved" && (
                    <h4 className="text-success mt-3">
                      the order has been reseved
                    </h4>
                  )}
                  {item?.orderStatus === "canceled" && (
                    <h4 className="text-danger mt-3">
                      this order has been canceled!
                    </h4>
                  )}
                  {item?.orderStatus === "confirmid" && (
                    <h4 className="text-success mt-3">
                      the order has been confirmid
                    </h4>
                  )}
                  {item?.orderStatus === "shipped" && (
                    <h4 className="text-success mt-3">
                      the order has been shipped
                    </h4>
                  )}
                  {item?.orderStatus === "on the way" && (
                    <h4 className="text-success mt-3">
                      the order went out for delivery
                    </h4>
                  )}
                  <div className="d-flex align-items-center mt-4">
                    <h4 className="me-4 fw-bold text-secondary ">
                      costumer profile :
                    </h4>
                    <Link
                      to={`/profile/${item?.userInfo?._id}`}
                      className="text-dark"
                    >
                      <img
                        src={item?.userInfo?.profilePhoto?.url}
                        style={{ width: "40px", height: "40px" }}
                        className="rounded-circle"
                      />{" "}
                      <span className="fw-bold">
                        {item?.userInfo?.username}
                      </span>
                    </Link>
                  </div>
                  <h4 className="fw-bold text-secondary mt-4">
                    Delever to : {profile?.location?.building}
                  </h4>
                </div>
              ))}{" "}
          </div>

          <div className="col-12 mt-3">
            {/* {posts?.length > 2 && ( */}
            <Paganation
              currentPage={currentPage}
              setcurrentPage={setcurrentPage}
              pages={pages}
            />
            {/* )} */}
          </div>
        </Main>
      ) : (
        <h1 className="fw-bold text-secondary text-center">
          {" "}
          you have no orders !
        </h1>
      )}
    </Holder>
  );
};
const Holder = styled.div`
  overflow: hidden;
  padding-top: 80px;
  // background-image: url("https://images.unsplash.com/photo-1615799998603-7c6270a45196?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  // background-size: contain;
  min-height: 100vh;

  & .inputs {
    padding: 5px;
    border-radius: 6px;
    border: 1px solid #ccc;
    outline: none;
    display: block;
    width: 100%;
    resize: none;
    margin-bottom: 10px;
  }
  & .order-item {
    width: 100%;
    background: #f2f2f2;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 30px;
  }
`;
const Main = styled.div``;

const OrderPos = styled.div`
  & .my-drop {
    inset: 10px auto auto -36px !important;
  }
  // position: absolute;
  // right: 8%;
  // top: 80px;
  z-index: 100;
`;
const Comments = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  margin-bottom: 20px;
  border-top: 1px solid #ccc;
  & form {
    display: flex;
    justify-content: center;
  }
  & input {
    border: 1px solid #ccc;
    border-right: none;
    background-color: white;
    // border-radius: 6px 0 0 6px;
    border-radius: 6px;
    padding: 3px;
    outline: none;
  }
  & button {
    // border-radius: 0 6px 6px 0;
    border-radius: 6px;
    padding: 3px;
    border: 1px solid #ccc;
    border-left: none;
  }
`;
export default OrdersStatus;
