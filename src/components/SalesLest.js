import FormatCurrency from "./FormatCurrency";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClosingOrdersApi } from "../redux/apiCalls/postApiCall";

const SalesLest = () => {
  const dispatch = useDispatch();
  const { orders, allMaxOrders, ClosingOrders } = useSelector(
    (state) => state.post
  );
  const { categories } = useSelector((state) => state.category);

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
      (order) => order?.orderDetails[0]?.mainCategory === item
    );

    const totalPrice = chosenItem.reduce((total, current) => {
      return total + (current?.orderDetails[0]?.price || 0);
    }, 0);

    return { chosenItem, totalPrice };
  };

  return (
    <div>
      {filteredItems.map((item) => {
        const { chosenItem, totalPrice } = handleItem(item?.mainTitle);
        const sold = chosenItem.length;
        const percent = Math.round((sold / allClosingOrders.length) * 100);

        // لو حابب تحسب النسبة مثلاً بناءً على أعلى مبيعات
        // تقدر تضيف منطق هنا بدل الرقم الثابت 98 أو 78

        return (
          <React.Fragment key={item?.mainTitle}>
            <h3 className="fw-bold">{item?.mainTitle} :</h3>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <h5 className="mb-1">{FormatCurrency(totalPrice)}</h5>
                <h5 className="ms-3 ms-sm-5 mb-1">Sold:</h5>
                <h5 className="mb-1 ms-4">{sold}</h5>
              </div>
              <h4 className="percent">{percent} %</h4>
            </div>
            <div className="progress mb-3">
              <div
                className="progress-bar progress-bar-striped"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow="78"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default SalesLest;
