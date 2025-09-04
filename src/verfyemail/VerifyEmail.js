import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyEmailApi } from "../redux/apiCalls/authApiCall";
const VerifyEmail = () => {
  const { isEmailVerified } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(verifyEmailApi(userId, token));
  }, [userId, token]);
  return (
    <div>
      {isEmailVerified ? (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          {" "}
          <div className="text-center">
            <h1 className="text-center">
              {" "}
              you have been verify your email please sign in
            </h1>
            <Link
              className="btn btn-success rounded-pill mt-3 btn-sm"
              to="/login"
            >
              go to login page
            </Link>
          </div>
        </div>
      ) : (
        <div className="make-center">
          <h1 className=" fw-bold">Unauthorized this link is expired</h1>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
