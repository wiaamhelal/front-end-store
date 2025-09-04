import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BasketItem from "./BasketItem";
import formatCurrency from "./FormatCurrency";
import { GetBasketTotal } from "../App";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  setConfirmOrderApi,
} from "../redux/apiCalls/profileApiCall";
import { postActions } from "../redux/slices/postSlice";
import { createNewOrderApi } from "../redux/apiCalls/postApiCall";

const Payment = () => {
  const navicate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const { basket } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getUserProfile(user._id));
  }, [profile]);

  const buyNow = async () => {
    dispatch(setConfirmOrderApi(user._id));
    await dispatch(createNewOrderApi({ newOrder: basket }));
    navicate("/orders");
    dispatch(postActions.clearBasket());
    window.location.reload(false);
  };
  return (
    <Holder>
      <Main className="container text-color ">
        <div className="">
          <h1 className="m-auto fw-bold " style={{ width: "fit-content" }}>
            checkout({basket?.length} items)
          </h1>
        </div>
        <div className="delevery-box d-block d-sm-flex align-items-center ">
          <h5 className="me-5 mt-0 mb-3 mb-sm-0 fw-bold">
            Delivery address :{" "}
          </h5>
          <div className="d-flex algin-items-center">
            {" "}
            <>
              <div className=" me-3 ">
                <span className="fw-bold">Arya : </span>
                <span className="fw-bold text-secondary mt-2 d-block">
                  {profile?.location?.arya}
                </span>
              </div>
              <div className=" me-3">
                <span className="fw-bold">Street : </span>{" "}
                <span className="fw-bold mt-2 text-secondary d-block">
                  {profile?.location?.street}
                </span>
              </div>
              <div className="">
                <span className="fw-bold">Building : </span>
                <span className="fw-bold text-secondary mt-2 d-block">
                  {profile?.location?.building}
                </span>
              </div>
            </>
          </div>
        </div>
        <div>
          <h5 className="fw-bold mt-4 mb-4">Revew items and delevery : </h5>
          {basket?.map((item) => (
            <BasketItem showbutton {...item} />
          ))}
        </div>
        <div className="d-block d-sm-flex align-items-center delevery-box">
          <h5 className="fw-bold mt-4 mb-4 me-4">Payment method : </h5>
          <div style={{ flex: "1" }}>
            <div className="d-flex align-items-center">
              <h6 className="fw-bold">Card number :</h6>
              <input type="number" className="my-input" />
            </div>
            <h6 className="fw-bold mt-2">
              Order total :{" "}
              <span style={{ marginLeft: "25px" }}>
                {formatCurrency(GetBasketTotal(basket))}
              </span>
            </h6>
            <button className="btn btn-success w-100 mb-1" onClick={buyNow}>
              Buy now
            </button>
          </div>
        </div>
      </Main>
    </Holder>
  );
};
const Holder = styled.div`
  overflow: hidden;
  padding-top: 80px;
  background-image: url("https://images.unsplash.com/photo-1615799998603-7c6270a45196?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: contain;
  min-height: 100vh;
`;
const Main = styled.div`
  & .delevery-box {
    margin-top: 20px;
    background-color: #eeeeee8c;
    padding: 10px;
    border-radius: 10px;
  }
  & .my-input {
    border: 1px solid #ccc;
    border-radius: 6px;
    margin-left: 10px;
    outline: none;
  }
`;
export default Payment;
