import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../redux/apiCalls/passwordApiCall";

const ForgetPassword = () => {
  const [email, setemail] = useState("");
  const dispatch = useDispatch();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("email is required");
    } else {
      dispatch(forgotPassword(email));
    }
  };
  return (
    <div className="container make-center">
      <div
        style={{ maxWidth: "500px" }}
        className="m-auto shadow rounded p-3 bg-white "
      >
        <h2 className="text-center">forget password</h2>
        <form onSubmit={formSubmitHandler}>
          <label className="mb-2">email</label>
          <input
            type="email"
            onChange={(e) => setemail(e.target.value)}
            placeholder="enter your email"
            className="my-input w-100"
          />
          <button className="btn btn-success w-100 mt-3">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
