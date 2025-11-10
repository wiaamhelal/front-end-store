import React, { useEffect } from "react";
import ClosingDetails from "./ClosingDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllClosingOrdersApi } from "../redux/apiCalls/postApiCall";

const CanceledOrders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllClosingOrdersApi());
  }, []);
  const { ClosingOrders } = useSelector((state) => state.post);
  const canceledItems = ClosingOrders?.flatMap((order) =>
    order.products.filter((p) => p.payment === "canceled")
  );

  return (
    <div className="details container mt-5 pt-5">
      {canceledItems?.length > 0 &&
        canceledItems?.map((p, i) => (
          <div key={i} className="product-item mb-2">
            <ClosingDetails expandedOrders={p} />
          </div>
        ))}
    </div>
  );
};

export default CanceledOrders;
