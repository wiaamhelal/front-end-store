// import React from "react";
// import ClosingDetails from "./ClosingDetails";
// import { useParams } from "react-router-dom";

// const ClosingItem = () => {
//   const { closing } = useParams();
//   return (
//     <div className="details">
//       <h1 className="fw-bold text-center mb-3">
//         {new Date(closing?.date).toLocaleDateString()}{" "}
//       </h1>
//       {closing?.products?.map((p, i) => (
//         <div key={i} className="product-item">
//           {/* <span>{p?.title}</span>
//          <span>{p?.payment}</span>
//          <span>× {p?.totalPrice}</span> */}
//           <ClosingDetails expandedOrders={p} />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ClosingItem;

import React from "react";
import ClosingDetails from "./ClosingDetails";
import { useLocation, useNavigate } from "react-router-dom";

const ClosingItem = () => {
  const { state: closing } = useLocation();
  const navigate = useNavigate();

  // تحقق في حال المستخدم فتح الصفحة مباشرة بدون state
  if (!closing) {
    return (
      <div className="text-center mt-5">
        <h3>⚠️ لا توجد بيانات لهذا الإغلاق</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
          الرجوع
        </button>
      </div>
    );
  }

  return (
    <div className="details container mt-5 pt-5">
      <h1 className="fw-bold text-center mb-3">
        {new Date(closing.date).toLocaleDateString()}
      </h1>

      {closing.products?.length > 0 ? (
        closing.products.map((p, i) => (
          <div key={i} className="product-item mb-2">
            <ClosingDetails expandedOrders={p} />
          </div>
        ))
      ) : (
        <p className="text-center">لا توجد منتجات مغلقة في هذا اليوم</p>
      )}
    </div>
  );
};

export default ClosingItem;
