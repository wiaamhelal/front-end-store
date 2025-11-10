import FormatCurrency from "./FormatCurrency";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getAllClosingOrdersApi } from "../redux/apiCalls/postApiCall";

const OurSalesBranchs = () => {
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
  // تعديل handleItem لإرجاع chosenItem و totalPrice
  const handleItem = (item) => {
    const chosenItem = allClosingOrders.filter(
      (order) => order?.orderDetails[0]?.category === item
    );

    const totalPrice = chosenItem.reduce((total, current) => {
      return total + (current?.orderDetails[0]?.price || 0);
    }, 0);

    return { chosenItem, totalPrice };
  };
  const { mainTitle } = useParams();
  const myMainCate = categories.filter((item) => item.mainTitle == mainTitle);
  const myMainOrders = allClosingOrders.filter(
    (item) => item.orderDetails[0]?.mainCategory === mainTitle
  );

  return (
    <Main>
      <div class="services" id="services">
        <div class="container">
          {myMainCate.map((item) => {
            const { chosenItem, totalPrice } = handleItem(item?.branchTitle);
            const sold = chosenItem.length;
            const percent =
              myMainOrders.length > 0
                ? Math.round((sold / myMainOrders.length) * 100)
                : 0;

            // لو حابب تحسب النسبة مثلاً بناءً على أعلى مبيعات
            // تقدر تضيف منطق هنا بدل الرقم الثابت 98 أو 78

            return (
              <div
                class="box"
                onClick={() =>
                  navicate(`/our-sales-orders/${item?.branchTitle}`)
                }
              >
                <i class="fa-solid fa-house">{percent}%</i>
                <h3>{item?.branchTitle}</h3>
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
export default OurSalesBranchs;
