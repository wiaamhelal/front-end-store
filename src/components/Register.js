import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/apiCalls/authApiCall";
import swal from "sweetalert";
import styled from "styled-components";
const Register = () => {
  const { registerMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const register = (e) => {
    e.preventDefault();
    if (!username) {
      return toast.error("username is required");
    } else if (!email) {
      return toast.error("email is required");
    } else if (!password) {
      return toast.error("password is required");
    } else {
      dispatch(registerUser({ username, email, password }));
    }
  };
  const navicate = useNavigate();
  if (registerMessage) {
    swal({
      title: registerMessage,
      icon: "success",
    }).then((ok) => {
      if (ok) {
        navicate("/sendlink", { replace: true });
      }
    });
  }
  return (
    <Holder>
      <div className="container make-center">
        <div
          style={{ maxWidth: "500px" }}
          className="m-auto shadow rounded p-3 bg-white container"
        >
          <h2 className="text-center">create a new account</h2>
          <form onSubmit={register}>
            <label className="mb-2">username</label>
            <input
              onChange={(e) => setusername(e.target.value)}
              type="text"
              placeholder="enter your name"
              className="my-input w-100 "
            />
            <label className="mb-2">email</label>
            <input
              type="email"
              onChange={(e) => setemail(e.target.value)}
              placeholder="enter your email"
              className="my-input w-100 "
            />
            <label className="mb-2">password</label>
            <input
              onChange={(e) => setpassword(e.target.value)}
              type="password"
              placeholder="enter your password"
              className="my-input w-100 shadow"
            />
            <button className="btn btn-success w-100 mt-3">Register</button>
          </form>
          <p className="mt-4 text-center">
            already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </Holder>
  );
};
const Holder = styled.div`
  background-image: url("https://images.unsplash.com/photo-1615799998603-7c6270a45196?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: contain;
  padding-bottom: 5px;
  min-height: 100vh;
  padding-top: 50px;
`;

export default Register;
