import React, { useState } from "react";
import BasketItem from "./BasketItem";
import formatCurrency from "./FormatCurrency";
import moment from "moment/moment";
import { GetBasketTotal } from "../App";
import { useSelector } from "react-redux";
import ToggleReturnOrder from "./ToggleReturnOrder";

const YourOrderItem = ({ item }) => {
  const { profile } = useSelector((state) => state.profile);

  item.orderDetails.map((it) => {});

  return (
    <div>
      <div className="order-item">
        <BasketItem
          {...item.orderDetails[0]}
          returnOrder={item.orderStatus == "receved" && true}
          // toggle={toggle}
          // settoggle={settoggle}
        />
        {item.orderDetails[1] && (
          <BasketItem
            {...item.orderDetails[1]}
            returnOrder={item.orderStatus == "receved" && true}
            // toggle={toggle}
            // settoggle={settoggle}
          />
        )}
        {item.orderDetails[2] && (
          <BasketItem
            {...item.orderDetails[2]}
            returnOrder={item.orderStatus == "receved" && true}
            // toggle={toggle}
            // settoggle={settoggle}
          />
        )}
        {item.orderDetails[3] && (
          <BasketItem
            {...item.orderDetails[3]}
            returnOrder={item.orderStatus == "receved" && true}
            // toggle={toggle}
            // settoggle={settoggle}
          />
        )}
        <h4 className="fw-bold text-secondary mt-4">
          Total Price : {formatCurrency(GetBasketTotal(item.orderDetails))}
        </h4>
        <h4 className="fw-bold text-secondary mt-4">
          Order Time : {moment(item.createdAt).format("MMMM DD  h:mma")}
        </h4>

        <div className="d-flex align-items-center mt-4">
          <h4 className="fw-bold text-secondary me-4">order status:</h4>
          {item.orderStatus == "false" && (
            <div className="d-flex align-itmes-center">
              <h4 class="text-success m-0 me-2">
                {/* <span
                class="spinner-grow spinner-grow-sm me-2"
                role="status"
                aria-hidden="true"
              ></span> */}
                your request has been received
              </h4>
              <img
                src="https://w7.pngwing.com/pngs/182/483/png-transparent-check-correct-green-mark-tick.png"
                style={{ width: "30px", height: "30px" }}
                alt=""
              />
            </div>
          )}
          {item.orderStatus == "confirmid" && (
            <div>
              <h4 className="text-success">your order has been confirmid</h4>
              <div class="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: " 10%" }}
                ></div>
              </div>
            </div>
          )}
          {item.orderStatus == "shipped" && (
            <div>
              <h4 className="text-success">your order has been shipped</h4>
              <div class="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: " 50%" }}
                ></div>
              </div>
            </div>
          )}
          {item.orderStatus == "on the way" && (
            <div>
              <h4 className="text-success">your order went out for delevery</h4>
              <div class="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: " 75%" }}
                ></div>
              </div>
            </div>
          )}
          {item.orderStatus == "receved" && (
            <div>
              <h4 className="text-success">your order has been receved</h4>
              <div class="progress">
                <div
                  className="progress-bar progress-bar-striped bg-success"
                  role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: " 100%" }}
                ></div>
              </div>
            </div>
          )}
          {item.orderStatus == "canceled" && (
            <div>
              <h3 className="text-danger">your order has been canceled</h3>
              <div class="progress">
                <div
                  className="progress-bar progress-bar-striped bg-danger"
                  role="progressbar"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: " 100%" }}
                ></div>
              </div>
            </div>
          )}
        </div>
        <h4 className="fw-bold text-secondary mt-4">
          Delever to : {profile?.location?.building}
        </h4>
      </div>
    </div>
  );
};

export default YourOrderItem;
