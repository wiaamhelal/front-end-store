import FormatCurrency from "./FormatCurrency";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getAllClosingOrdersApi,
  getMaxAllOrdersApi,
} from "../redux/apiCalls/postApiCall";

const OurSales = () => {
  const { orders, allMaxOrders, ClosingOrders } = useSelector(
    (state) => state.post
  );
  const { categories } = useSelector((state) => state.category);
  const navicate = useNavigate();
  const dispatch = useDispatch();
  // إنشاء مجموعة (Set) للاحتفاظ فقط بـ `mainTitle` الفريد
  const uniqueMainTitles = new Set();

  // تصفية العناصر بحيث يتم الاحتفاظ فقط بأول قيمة فريدة لـ `mainTitle`
  const filteredItems = categories.filter((item) => {
    if (item.mainTitle && !uniqueMainTitles.has(item.mainTitle)) {
      uniqueMainTitles.add(item.mainTitle);
      return true;
    }
    return false;
  });
  useEffect(() => {
    dispatch(getAllClosingOrdersApi());
  }, []);
  const allClosingOrders = ClosingOrders.flatMap((item) => item.products);

  const handleItem = (item) => {
    const chosenItem = allClosingOrders.filter(
      (order) => order?.orderDetails[0]?.mainCategory === item
    );

    const totalPrice = chosenItem.reduce((total, current) => {
      return total + (current?.orderDetails[0]?.price || 0);
    }, 0);

    return { chosenItem, totalPrice };
  };
  dispatch(getMaxAllOrdersApi());
  return (
    <Main>
      <div class="services" id="services">
        <div class="container">
          {filteredItems.map((item) => {
            const { chosenItem, totalPrice } = handleItem(item?.mainTitle);
            const sold = chosenItem.length;
            const percent = Math.round((sold / allClosingOrders.length) * 100);
            return (
              <div
                class="box"
                onClick={() =>
                  navicate(`/our-sales-branchs/${item?.mainTitle}`)
                }
              >
                <i class="fa-solid fa-house">{percent}%</i>
                <h3>{item?.mainTitle}</h3>
                <div className="info d-flex align-items-center justify-content-between">
                  <span className="first-span">{sold}</span>
                  <span className="second-span">
                    {FormatCurrency(totalPrice)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Main>
  );
};
const Main = styled.div`
  margin-top: 100px;
`;
export default OurSales;
