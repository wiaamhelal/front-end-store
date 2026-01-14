// CheckoutForm.js
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  setConfirmOrderApi,
} from "../redux/apiCalls/profileApiCall";
import { createNewOrderApi } from "../redux/apiCalls/postApiCall";
import { postActions } from "../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navicate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const { basket, totalPrice } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getUserProfile(user._id));
  }, [profile]);
  const newBasket = [...basket, totalPrice];
  const paymentSuccess = async () => {
    dispatch(setConfirmOrderApi(user._id));
    await dispatch(
      createNewOrderApi({ newOrder: basket, totalPrice: totalPrice })
    );
    navicate("/orders");
    dispatch(postActions.clearBasket());
    // window.location.reload(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // يمنع redirect
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    // ✅ نجاح الدفع فقط
    if (paymentIntent?.status === "succeeded") {
      setErrorMsg("");
      setSuccess(true);

      await paymentSuccess(); // تنفيذ دالة النجاح بدل success link
    }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button
          className="btn btn-success btn-sm mt-2"
          disabled={loading || !stripe}
          type="submit"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
      {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
      {success && <div>Payment successful!</div>}
    </div>
  );
}

export default CheckoutForm;
