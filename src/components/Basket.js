import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import BasketItem from "./BasketItem";
import formatCurrency from "./FormatCurrency";
import { GetBasketTotal } from "../App";
import { json, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Basket = () => {
  const navicate = useNavigate();
  const [cobonText, setcobonText] = useState("");
  const CobonCode = (e) => {
    e.preventDefault();
    toast.error("the cobon is wrong");
    setcobonText("");
  };
  const { basket } = useSelector((state) => state.post);

  const { user } = useSelector((state) => state.auth);

  return (
    <Holder>
      <Main className="row gap-4 p-4">
        <BasketItems className="col-12 col-sm-7">
          <h2>Hello, {user ? user.displayName : "guest"}</h2>
          <h4 className="mb-3 lh-lg">
            {!basket?.length
              ? "your basket is empty go get some stuff"
              : "Your shoping basket"}
          </h4>
          {basket?.map((item) => (
            <BasketItem showbutton {...item} />
          ))}
        </BasketItems>
        {basket?.length && (
          <Subtotal
            className="col-12 col-sm-4 rounded bg-light p-2 m-auto"
            style={{ height: "fit-content" }}
          >
            <h5 className="text-center mb-3">
              Subtotal ( {basket?.length} item ) :{" "}
              {formatCurrency(GetBasketTotal(basket))}
            </h5>
            <h6>Try to get discount :</h6>
            <form
              onSubmit={(e) => CobonCode(e)}
              className="d-flex align-items-center justify-content-between"
              style={{ flexWrap: "wrap" }}
            >
              <input
                onChange={(e) => setcobonText(e.target.value)}
                value={cobonText}
                className="rounded"
                type="text"
                placeholder="type your cobon code"
                style={{
                  padding: "3px",
                  border: "1px solid #ccc",
                  outline: "none",
                }}
              />{" "}
              <button className="btn btn-sm btn-success">submit</button>
            </form>
            <button
              className="btn btn-success w-100 mt-3"
              onClick={() =>
                user ? navicate("/location") : navicate("/signin")
              }
            >
              Proceed to checkout
            </button>
          </Subtotal>
        )}
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
const Main = styled.div``;
const Subtotal = styled.div``;
const BasketItems = styled.div``;

export default Basket;
