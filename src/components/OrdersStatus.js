import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BasketItem from "./BasketItem";
import moment from "moment/moment";
import swal from "sweetalert";
import {
  getUserProfile,
  setUserOrdersApi,
} from "../redux/apiCalls/profileApiCall";
import {
  closingOrdersApi,
  getAllOrdersApi,
  getMaxAllOrdersApi,
  getOrdersCountApi,
  paymentOrderApi,
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
  const { payment } = useSelector((state) => state.post);
  const [orderStatus, setorderStatus] = useState("");
  // const [closeToggle, setCloseToggle] = useState(false);
  const [openPaymentId, setOpenPaymentId] = useState(null);
  useEffect(() => {
    dispatch(getUserProfile(user._id));
    dispatch(getOrdersCountApi());
  }, []);
  const dispatch = useDispatch();

  const POST_PER_PAGE = 8;
  const [search, setsearch] = useState("");

  const [currentPage, setcurrentPage] = useState(1);
  const [canceledItem, setCanceledItems] = useState({});
  const pages = Math.ceil(ordersCount / POST_PER_PAGE);
  let status = orders;

  const submitSerch = () => {
    // e.preventDefault();
    status = [];
    status = allMaxOrders;
  };

  const submitStatus = async (item) => {
    if (orderStatus == "canceled") {
      setCanceledItems(item);
      return setCancelToggle(true);
    }

    await dispatch(
      updateOrderStatusApi({ orderStatus: orderStatus }, item._id)
    );
    window.location.reload();
  };

  const submitPayment = (id, payment) => {
    dispatch(paymentOrderApi({ payment }, id));
  };
  useEffect(() => {
    dispatch(getAllOrdersApi(currentPage));
    dispatch(getMaxAllOrdersApi());
    if (search !== "") {
      status = allMaxOrders;
    }
  }, [currentPage, search, allMaxOrders]);
  // console.log(payment);

  const closeForToday = () => {
    swal({
      title: "Are you sure?",
      text: "Once you close, you will not be able to come back!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((yes) => {
      if (yes) {
        dispatch(closingOrdersApi({ products: allMaxOrders }));
        // window.location.reload(false);
      }
    });
  };
  // let disabled = false;
  // useEffect(() => {
  //   allMaxOrders.map((item) =>
  //     item.payment === "unpaid" ? (disabled = true) : (disabled = false)
  //   );
  // }, []);

  const [disabled, setDisabled] = useState(false);
  const [cancelToggle, setCancelToggle] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    // إذا وُجد أي عنصر غير مدفوع، عطّل الزر
    const hasUnpaid = allMaxOrders.some((item) => item.payment === "unpaid");
    setDisabled(hasUnpaid);
  }, [allMaxOrders]);

  console.log(disabled);
  console.log(allMaxOrders);

  const SubmitCancel = () => {
    return swal({
      title: "Are you sure?",
      text: "Once you cancel, you will not be able to come back!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (yes) => {
      if (yes) {
        await dispatch(
          updateOrderStatusApi(
            { orderStatus: orderStatus, CancelReason: cancelReason },
            canceledItem._id
          )
        );
        await dispatch(
          paymentOrderApi({ payment: "canceled" }, canceledItem._id)
        );
        setCancelToggle(false);
        setCancelReason("");
      }
    });
  };

  const handleCheck = (value) => {
    if (cancelReason === value) {
      setCancelReason(null); // إلغاء التحديد إذا ضغط نفس الخيار
    } else {
      setCancelReason(value); // تحديد الخيار المختار
    }
  };
  return (
    <Holder>
      {orders.length > 0 && (
        <button
          className="btn btn-success mt-2 ms-2"
          onClick={closeForToday}
          disabled={disabled}
        >
          close for today
        </button>
      )}

      {Array.isArray(orders) && (
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
                    {item?.totalPrice}
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
                          onClick={SubmitCancel}
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
                      {item?.orderStatus === "receved" && (
                        <>
                          {item?.payment === "unpaid" && (
                            <button
                              className="btn btn-success btn-sm ms-3"
                              onClick={() => setOpenPaymentId(item._id)}
                            >
                              Payment
                            </button>
                          )}
                          {item?.payment === "cash" && (
                            <button
                              className="btn btn-success btn-sm ms-3"
                              onClick={() => setOpenPaymentId(item._id)}
                              disabled={true}
                            >
                              Cash
                            </button>
                          )}
                          {item?.payment === "visa" && (
                            <button
                              className="btn btn-success btn-sm ms-3"
                              onClick={() => setOpenPaymentId(item._id)}
                              disabled={true}
                            >
                              Visa
                            </button>
                          )}
                          {item?.payment === "credit" && (
                            <button
                              className="btn btn-success btn-sm ms-3"
                              onClick={() => setOpenPaymentId(item._id)}
                              disabled={true}
                            >
                              Credit
                            </button>
                          )}
                        </>
                      )}
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
                  <CloseToggle>
                    <div
                      className="modal align-items-center justify-content-center"
                      tabindex="-1"
                      style={
                        openPaymentId === item._id
                          ? { display: "flex ", background: "#0000005e" }
                          : { display: "none" }
                      }
                    >
                      <div
                        className="modal-dialog"
                        style={{ animation: "fade 0.5s" }}
                      >
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">
                              After you take this step there is no coming back
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              onClick={() => setOpenPaymentId(null)}
                            ></button>
                          </div>
                          {/* <div className="modal-body">
                <p className=" lh-md text-center">
                  do you need the ad for one day or unlimited time (one day it
                  will delete after 24 hours)
                </p>
              </div> */}
                          <div className="modal-footer d-flex justify-content-between">
                            <button
                              type="button"
                              className="btn btn-success rounded-pill"
                              data-bs-dismiss="modal"
                              // onClick={() => {
                              //   setPayment("cash");
                              //   dispatch(
                              //     paymentOrderApi(
                              //       { payment: "calsh" },
                              //       item._id
                              //     )
                              //   );
                              //   setCloseToggle(false);
                              // }}
                              onClick={() => {
                                submitPayment(openPaymentId, "cash");
                                setOpenPaymentId(null);
                              }}
                            >
                              Cash
                            </button>
                            <button
                              type="button"
                              className="btn btn-success rounded-pill"
                              onClick={() => {
                                submitPayment(openPaymentId, "visa");
                                setOpenPaymentId(null);
                              }}
                            >
                              Visa
                            </button>
                            <button
                              type="button"
                              className="btn btn-success rounded-pill"
                              onClick={() => {
                                submitPayment(openPaymentId, "credit");
                                setOpenPaymentId(null);
                              }}
                            >
                              Credit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CloseToggle>
                </div>
              ))}{" "}
          </div>

          <div className="col-12 mt-3">
            {/* {posts?.length > 2 && ( */}
            {orders.length > 0 && (
              <Paganation
                currentPage={currentPage}
                setcurrentPage={setcurrentPage}
                pages={pages}
              />
            )}

            {/* )} */}
            {orders.length === 0 && (
              <h1 className="fw-bold text-secondary text-center">
                {" "}
                you have no orders !
              </h1>
            )}
          </div>
        </Main>
      )}
      <UbdatePassword>
        <div
          className="modal align-items-center justify-content-center"
          tabindex="-1"
          style={
            cancelToggle
              ? { display: "flex ", background: "#0000005e" }
              : { display: "none" }
          }
        >
          <div className="modal-dialog" style={{ animation: "fade 0.5s" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Why do wanna cancel this order ?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setCancelToggle(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="outofstock"
                    className="me-2"
                    onChange={() => handleCheck("out of stock")}
                    checked={cancelReason === "out of stock"}
                  />
                  <label
                    htmlFor="outofstock"
                    className="mb-1"
                    style={{ cursor: "pointer" }}
                  >
                    out of stock
                  </label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="checkbox"
                    id="chagehismind"
                    className="me-2"
                    onChange={() => handleCheck("customer chage his mind")}
                    checked={cancelReason === "customer chage his mind"}
                  />
                  <label
                    htmlFor="chagehismind"
                    className="mb-1"
                    style={{ cursor: "pointer" }}
                  >
                    customer chage his mind
                  </label>
                </div>
                <label className="mb-1">Other reason</label>
                <textarea
                  className="inputs"
                  onChange={(e) => handleCheck(e.target.value)}
                  disabled={
                    cancelReason === "customer chage his mind" ||
                    cancelReason === "out of stock"
                  }
                />
              </div>
              <div className="modal-footer d-flex justify-content-between">
                <button
                  type="button"
                  className="btn btn-success rounded-pill"
                  data-bs-dismiss="modal"
                  onClick={() => setCancelToggle(false)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="btn btn-success rounded-pill"
                  onClick={SubmitCancel}
                  disabled={!cancelReason}
                >
                  Cinfirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </UbdatePassword>
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

const CloseToggle = styled.div`
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

export default OrdersStatus;
