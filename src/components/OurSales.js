import FormatCurrency from "./FormatCurrency";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMaxAllOrdersApi } from "../redux/apiCalls/postApiCall";

const OurSales = () => {
  const { orders, allMaxOrders } = useSelector((state) => state.post);
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

  // تعديل handleItem لإرجاع chosenItem و totalPrice
  const handleItem = (item) => {
    const chosenItem = allMaxOrders.filter(
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
            const percent = Math.round((sold / allMaxOrders.length) * 100);

            // لو حابب تحسب النسبة مثلاً بناءً على أعلى مبيعات
            // تقدر تضيف منطق هنا بدل الرقم الثابت 98 أو 78

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
