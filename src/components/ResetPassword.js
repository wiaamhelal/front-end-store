import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  getResetPassword,
  resetPassword,
} from "../redux/apiCalls/passwordApiCall";

const ResetPassword = () => {
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const { isError, sucResPass } = useSelector((state) => state.password);
  const { userId, token } = useParams();
  const navicate = useNavigate();

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!password) {
      return toast.error("password is required");
    } else {
      dispatch(resetPassword(password, { userId, token }));
      setpassword("");
    }
  };
  useEffect(() => {
    if (sucResPass) {
      navicate("/login");
      // setTimeout(() => {

      // }, 5000);
    }
  }, [sucResPass]);
  return (
    <div className="container make-center">
      <div
        style={{ maxWidth: "500px" }}
        className="shadow rounded p-3 bg-white m-auto"
      >
        {isError ? (
          <h1>not found</h1>
        ) : (
          <>
            <h2 className="text-center">Reset password</h2>
            <form onSubmit={formSubmitHandler}>
              <label className="mb-2">New password</label>
              <input
                onChange={(e) => setpassword(e.target.value)}
                type="password"
                placeholder="enter your new password"
                className="my-input w-100 shadow"
                value={password}
              />
              <button className="btn btn-success w-100 mt-3">submit</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
