import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllClosingOrdersApi,
  getRetunedOrdersApi,
} from "../redux/apiCalls/postApiCall";

const AccountantPage = () => {
  const navicate = useNavigate();
  const dispatch = useDispatch();

  const { ClosingOrders, returnOrdes } = useSelector((state) => state.post);
  const canceledItems = ClosingOrders?.flatMap((order) =>
    order.products.filter((p) => p.payment === "canceled")
  );
  useEffect(() => {
    dispatch(getAllClosingOrdersApi());
  }, []);
  useEffect(() => {
    dispatch(getRetunedOrdersApi());
  }, [returnOrdes]);
  useEffect(() => {
    dispatch(getRetunedOrdersApi());
  }, []);
  return (
    <div className=" mt-5 pt-5">
      <div class="services" id="services">
        <div class="container">
          <div
            class="box"
            onClick={() => navicate("/canceled-orders")}
            style={{ cursor: "pointer" }}
          >
            <i class="fa-solid fa-house">Canceled Orders</i>
            <div className="info d-flex align-items-center justify-content-between">
              <span className="first-span">Total</span>
              <span className="second-span">{canceledItems.length}</span>
            </div>
          </div>
          <div
            class="box"
            onClick={() => navicate("/closing-page")}
            style={{ cursor: "pointer" }}
          >
            <i class="fa-solid fa-house">Closing Orders</i>
            <div className="info d-flex align-items-center justify-content-between">
              <span className="first-span">Total</span>
              <span className="second-span">{ClosingOrders.length}</span>
            </div>
          </div>
          <div
            class="box"
            onClick={() => navicate("/retun-order")}
            style={{ cursor: "pointer" }}
          >
            <i class="fa-solid fa-house">Return Orders</i>
            <div className="info d-flex align-items-center justify-content-between">
              <span className="first-span">Total</span>
              <span className="second-span">{returnOrdes.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountantPage;
