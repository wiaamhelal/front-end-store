import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { getUserProfile } from "../redux/apiCalls/profileApiCall";
import { getAllOrdersApi } from "../redux/apiCalls/postApiCall";

import swal from "sweetalert";
import YourOrderItem from "./YourOrderItem";

const Orders = () => {
  const { orders } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserProfile(user._id));
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersApi());
  }, []);

  return (
    <Holder>
      {profile?.orders ? (
        <Main className="container">
          <div className="d-flex align-items-center justify-content-between mb-5">
            <h1 className="text-secondary m-0 fw-bold  lh-lg">
              Thank you for your order m.r {user?.username}
            </h1>
            {/* <button onClick={ReturnOrder} className="btn btn-danger mt-4 ">
              Return the order
            </button> */}
          </div>
          <h2 className="mb-3 fw-bold text-secondary">Your Orders : </h2>

          <div>
            {orders?.map(
              (item) =>
                item?.userDetails == user?._id && <YourOrderItem item={item} />
            )}{" "}
          </div>

          {/* <h2 className="fw-bold text-secondary mt-4">
        delevery date :
        {moment.unix(orders[0]?.created).format("MMMM DD h:mma")}
      </h2> */}
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
  & .order-item {
    width: 100%;
    background: #f2f2f2;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 30px;
  }
  & .return-button {
  }
`;
const Main = styled.div``;
export default Orders;
