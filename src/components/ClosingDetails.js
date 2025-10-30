import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BasketItem from "./BasketItem";
import moment from "moment/moment";
import { Link } from "react-router-dom";

const ClosingDetails = ({ expandedOrders }) => {
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  console.log(expandedOrders);
  let item = expandedOrders;
  return (
    <Holder>
      {expandedOrders && (
        <Main className="container">
          <div className="d-flex align-items-center justify-content-between"></div>
          {/* <div>{<YourOrderItem item={expandedOrders} />}</div> */}
          <div>
            <div className="order-item">
              <BasketItem
                close={true}
                {...item.orderDetails[0]}
                returnOrder={item.orderStatus == "receved" && true}
              />
              {item.orderDetails[1] && (
                <BasketItem
                  close={true}
                  {...item.orderDetails[1]}
                  returnOrder={item.orderStatus == "receved" && true}
                />
              )}
              {item.orderDetails[2] && (
                <BasketItem
                  close={true}
                  {...item.orderDetails[2]}
                  returnOrder={item.orderStatus == "receved" && true}
                />
              )}
              {item.orderDetails[3] && (
                <BasketItem
                  close={true}
                  {...item.orderDetails[3]}
                  returnOrder={item.orderStatus == "receved" && true}
                />
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
                  <span className="fw-bold">{item?.userInfo?.username}</span>
                </Link>
              </div>
              <h4 className="fw-bold text-secondary mt-4">
                Order ID : {item?._id}
              </h4>
              <h4 className="fw-bold text-secondary mt-4">
                {/* Total Price : {formatCurrency(GetBasketTotal(item.orderDetails))} */}
                Total Price : {item?.totalPrice}
              </h4>
              <h4 className="fw-bold text-secondary mt-4">
                Order Time : {moment(item.createdAt).format("MMMM DD  h:mma")}
              </h4>
              <h4 className="fw-bold text-secondary mt-4">
                {/* Total Price : {formatCurrency(GetBasketTotal(item.orderDetails))} */}
                Payment: {item?.payment}
              </h4>
              <h4 className="fw-bold text-secondary mt-4">
                {/* Total Price : {formatCurrency(GetBasketTotal(item.orderDetails))} */}
                Close By: {item?.closeBy}
              </h4>
              <h4 className="fw-bold text-secondary mt-4">
                {/* Total Price : {formatCurrency(GetBasketTotal(item.orderDetails))} */}
                Close Time: {moment(item?.closeTime).format("MMMM DD  h:mma")}
              </h4>
              <h4 className="fw-bold text-secondary mt-4">
                Delever to : {profile?.location?.building}
              </h4>
            </div>
          </div>
        </Main>
      )}
    </Holder>
  );
};
const Holder = styled.div`
  overflow: hidden;
  // background-image: url("https://images.unsplash.com/photo-1615799998603-7c6270a45196?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  // background-size: contain;

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
export default ClosingDetails;
