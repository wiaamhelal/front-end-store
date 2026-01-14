// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import styled from "styled-components";
// import BasketItem from "./BasketItem";
// import formatCurrency from "./FormatCurrency";
// import { GetBasketTotal } from "../App";
// import { useNavigate } from "react-router-dom";
// import {
//   createPaymentIntentApi,
//   getUserProfile,
//   setConfirmOrderApi,
// } from "../redux/apiCalls/profileApiCall";
// import { postActions } from "../redux/slices/postSlice";
// import { createNewOrderApi } from "../redux/apiCalls/postApiCall";
// import { stripePromise } from "./StripeProvider";
// import request from "../utils/request";
// import CheckoutForm from "./CheckoutForm";
// import {
//   CardElement,
//   Elements,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// // import { CardElement, Elements } from "@stripe/react-stripe-js";

// const Payment = () => {
//   const { user } = useSelector((state) => state.auth);
//   const { profile } = useSelector((state) => state.profile);
//   const { basket, totalPrice } = useSelector((state) => state.post);
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const navicate = useNavigate();
//   const dispatch = useDispatch();
//   const [clientsecret, setClientSecret] = useState("");
//   const [procesing, setProcessing] = useState(false);
//   const [error, setError] = useState(null);
//   const [disabled, setDisabled] = useState(true);
//   const [succeeded, setSucceeded] = useState(false);

//   useEffect(() => {
//     const getClientSecret = async () => {
//       if (!basket.length) return;

//       try {
//         const response = await request.post(
//           `/payments/create?total=${GetBasketTotal(basket)}`
//         );

//         setClientSecret(response.data.clientSecret);
//       } catch (error) {
//         console.error(
//           "Payment error:",
//           error.response?.status,
//           error.response?.data
//         );
//       }
//     };

//     getClientSecret();
//   }, [basket]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setProcessing(true);
//     const payload = await stripe
//       .confirmCardPayment(clientsecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       })
//       .then(({ paymentIntent }) => {
//         setSucceeded(true);
//         setError(null);
//         setProcessing(false);
//         dispatch(setConfirmOrderApi(user._id));
//         dispatch(
//           createNewOrderApi({ newOrder: basket, totalPrice: totalPrice })
//         );
//         navicate("/orders");
//         dispatch(postActions.clearBasket());
//       });
//   };

//   const handleChange = (e) => {
//     setDisabled(e.empty);
//     setError(error ? error.message : "");
//   };

//   useEffect(() => {
//     dispatch(getUserProfile(user._id));
//   }, [profile]);
//   const newBasket = [...basket, totalPrice];
//   const buyNow = async () => {
//     dispatch(setConfirmOrderApi(user._id));
//     await dispatch(
//       createNewOrderApi({ newOrder: basket, totalPrice: totalPrice })
//     );
//     navicate("/orders");
//     dispatch(postActions.clearBasket());
//     // window.location.reload(false);
//   };

//   const payNow = async () => {
//     // الخطوة 1: إنشاء عملية الدفع
//     await dispatch(createPaymentIntentApi(totalPrice, setClientSecret));
//   };
//   // console.log("CLIENT SECRET:", clientsecret);
//   // console.log(GetBasketTotal(basket));
//   return (
//     <Holder>
//       <Main className="container text-color ">
//         <div className="">
//           <h1 className="m-auto fw-bold " style={{ width: "fit-content" }}>
//             checkout({basket?.length} items)
//           </h1>
//         </div>
//         <div className="delevery-box d-block d-sm-flex align-items-center ">
//           <h5 className="me-5 mt-0 mb-3 mb-sm-0 fw-bold">
//             Delivery address :{" "}
//           </h5>
//           <div className="d-flex algin-items-center">
//             {" "}
//             <>
//               <div className=" me-3 ">
//                 <span className="fw-bold">Arya : </span>
//                 <span className="fw-bold text-secondary mt-2 d-block">
//                   {profile?.location?.arya}
//                 </span>
//               </div>
//               <div className=" me-3">
//                 <span className="fw-bold">Street : </span>{" "}
//                 <span className="fw-bold mt-2 text-secondary d-block">
//                   {profile?.location?.street}
//                 </span>
//               </div>
//               <div className="">
//                 <span className="fw-bold">Building : </span>
//                 <span className="fw-bold text-secondary mt-2 d-block">
//                   {profile?.location?.building}
//                 </span>
//               </div>
//             </>
//           </div>
//         </div>
//         <div>
//           <h5 className="fw-bold mt-4 mb-4">Revew items and delevery : </h5>
//           {basket?.map((item) => (
//             <BasketItem showbutton {...item} />
//           ))}
//         </div>
//         <div className="d-block d-sm-flex align-items-center delevery-box">
//           <h5 className="fw-bold mt-4 mb-4 me-4">Payment method : </h5>
//           <div style={{ flex: "1" }}>
//             <div className="d-flex align-items-center">
//               <h6 className="fw-bold">Card number :</h6>

//               {clientsecret ? (
//                 <Elements
//                   stripe={stripePromise}
//                   options={{ clientSecret: clientsecret }}
//                 >
//                   <CheckoutForm />
//                 </Elements>
//               ) : (
//                 <p>Loading payment...</p>
//               )}
//             </div>
//             <h6 className="fw-bold mt-2">
//               Order total :{" "}
//               <span style={{ marginLeft: "25px" }}>
//                 {/* {formatCurrency(GetBasketTotal(basket))} */}
//                 {totalPrice}
//               </span>
//             </h6>
//             <button className="btn btn-success w-100 mb-1" onClick={payNow}>
//               Buy now
//             </button>
//           </div>
//         </div>
//       </Main>
//     </Holder>
//   );
// };
// const Holder = styled.div`
//   overflow: hidden;
//   padding-top: 80px;
//   background-image: url("https://images.unsplash.com/photo-1615799998603-7c6270a45196?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
//   background-size: contain;
//   min-height: 100vh;
// `;
// const Main = styled.div`
//   & .delevery-box {
//     margin-top: 20px;
//     background-color: #eeeeee8c;
//     padding: 10px;
//     border-radius: 10px;
//   }
//   & .my-input {
//     border: 1px solid #ccc;
//     border-radius: 6px;
//     margin-left: 10px;
//     outline: none;
//   }
// `;
// export default Payment;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BasketItem from "./BasketItem";
import { GetBasketTotal } from "../App";
import request from "../utils/request";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const Payment = () => {
  const stripePromise = loadStripe(
    "pk_test_51SmXEoCGx8sOIqg3Fqww6lqli2KuRZONXpiKCZV0EDZTWLVvphxUGB5cTrC2X3Gh0RfAbzfycwYh9sgdU9mCQStC00oc0W43QU"
  );

  const [clientSecret, setClientSecret] = useState("");
  const { basket, totalPrice } = useSelector((state) => state.post);
  useEffect(() => {
    const getClientSecret = async () => {
      if (!basket.length) return;

      try {
        const totalAmount = GetBasketTotal(basket);

        const response = await request.post(
          `/payments/create?total=${totalAmount}`
        );

        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error(
          "Payment error:",
          error.response?.status,
          error.response?.data
        );
      }
    };

    getClientSecret();
  }, [basket]);

  return (
    <Holder>
      <Main className="container">
        <h2 className="fw-bold mb-4">Checkout ({basket.length} items)</h2>

        {basket.map((item) => (
          <BasketItem key={item._id} {...item} />
        ))}

        <h4 className="mt-4 mb-3">
          Order Total: <strong>{totalPrice}</strong>
        </h4>

        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        ) : (
          <p>Loading payment...</p>
        )}
      </Main>
    </Holder>
  );
};

const Holder = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;

const Main = styled.div`
  background: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
`;

export default Payment;
