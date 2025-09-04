import React, { useEffect, useState } from "react";
import styled from "styled-components";
import locationImg from "../img/location-sign-svgrepo-com.svg";
import phoneImg from "../img/phone-call-telephone-svgrepo-com.svg";
import emailImg from "../img/email-svgrepo-com.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AllCommentsClintsApi,
  createNewClinetComment,
} from "../redux/apiCalls/commentApiCall";
import { toast } from "react-toastify";
import { getUserProfile } from "../redux/apiCalls/profileApiCall";
import { commentActions } from "../redux/slices/commentSlice";

const ContactUs = () => {
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const { clinetComments } = useSelector((state) => state.comment);

  const dispatch = useDispatch();
  const [comment, setcomment] = useState("");
  const [number, setnumber] = useState(0);
  const HandleSubmit = () => {
    // e.preventdefault();
    const payload = {
      comment: comment,
      user: user,
      //   time: Timestamp.now(),
    };
    // dispatch(setcomments(payload));
    setcomment("");
    setnumber(number + 1);
  };
  const sendComment = (e) => {
    e.preventDefault();
    dispatch(createNewClinetComment({ text: comment }));
    // toast.success("thank you for your opininiont");
    setcomment("");
  };
  useEffect(() => {
    if (user?.isAdmin) {
      dispatch(getUserProfile(user?._id));
      dispatch(AllCommentsClintsApi());
    }
  }, [user, clinetComments]);
  return (
    <Holder>
      <Main className="container text-color">
        {" "}
        <h1 className="fw-bold text-center mt-1">GET IN TOUCH</h1>
        <SocialContainer className="mt-3 row">
          <SocialItem className="col-12 col-sm-4 mt-4">
            <img src={locationImg} alt="" />
            <h4>ADDRESS</h4>
            <div className="mb-3">
              <p className="fw-bold">Dubai</p>
              <p>street 16, onbasif metro station</p>
              <p>alwasil building</p>
            </div>
            <div className="mb-3">
              <p className="fw-bold">Sharjah</p>
              <p>industrial 5</p>
              <p>sohali building</p>
            </div>
            <div className="mb-3">
              <p className="fw-bold">Abu Dhabi</p>
              <p>street 35, alkora station</p>
              <p>sanrol building</p>
            </div>
            <div className="mb-3">
              <p className="fw-bold">Al Ain</p>
              <p>street 12, solahiba station</p>
              <p>shanora building</p>
            </div>
          </SocialItem>
          <SocialItem className="col-12 col-sm-4 mt-4">
            <img src={phoneImg} alt="" />
            <h4>PHONE</h4>
            <div className="mb-3">
              <p className="fw-bold">Weifield Group Contracting</p>
              <p>877.WEIFIELD phone</p>
            </div>
            <div className="mb-3">
              <p className="fw-bold">Weifield 24/7 Service Department</p>
              <p>877.WEIFIELD</p>
              <p>(Then press 0 for emergency calls)</p>
            </div>
            <div className="mb-3">
              <p className="fw-bold">Northern Colorado Office</p>
              <p>877.WEIFIELD phone</p>
            </div>
            <div className="mb-3">
              <p className="fw-bold">Wyoming Office</p>
              <p>877.WEIFIELD phone</p>
            </div>
          </SocialItem>
          <SocialItem className="col-12 col-sm-4 mt-4">
            <img src={emailImg} alt="" />
            <h4>EMAIL</h4>
            <div className="mb-3">
              <p className="fw-bold">Request for Proposal</p>
              <p>weaam224112@gmail.com</p>
            </div>
            <div className="mb-3">
              <p className="fw-bold">All Bid Opportunities</p>
              <p>estimating@weifieldgroup.com</p>
            </div>
            <div className="mb-3">
              <p className="fw-bold">Electrical Service Calls</p>
              <p>service@weifieldgroup.com</p>
            </div>
            <div className="mb-3">
              <p className="fw-bold">Employment Opportunities</p>
              <p>recruiting@weifieldgroup.com</p>
            </div>
          </SocialItem>
        </SocialContainer>
        <div className=" my-shadw" style={{ height: "1px" }}></div>
        <MessageUs className="mt-5 row">
          <FirstPart className=" col-12 col-sm-6">
            <h1 className="mb-3 fw-bold text-center text-sm-start">
              Message Us
            </h1>
            <p style={{ lineHeight: "1.7" }}>
              If you wish to be considered for employment at Weifield, please do
              not send a message, here – instead, please complete Weifield’s job
              application and our Human Resources department will contact you
              after their review of your submitted information.
            </p>
          </FirstPart>
          <SecondPart className="col-12 col-sm-6">
            <form>
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="fw-bold">Name</h6>{" "}
                {!user && (
                  <div className="d-flex align-items-center">
                    <Link
                      to="/login"
                      style={{ fontSize: "12px" }}
                      className="btn btn-sm btn-primary rounded-pill mb-1"
                    >
                      Sign in
                    </Link>
                    <h6 className="fw-bold text-danger ms-2">
                      You have to sign in first
                    </h6>
                  </div>
                )}
              </div>
              <input
                disabled={!user}
                type="text"
                value={user?.username}
                className="my-feild"
              />
              <h6 className="fw-bold mt-3">Email</h6>
              <input
                type="email"
                disabled={!user}
                className="my-feild"
                value={user?.email}
              />
              <h6 className="fw-bold mt-3">comments</h6>
              <textarea
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
                disabled={!user}
                className="my-feild"
              />
              <button
                onClick={sendComment}
                disabled={!user || !comment}
                className="d-block btn btn-success mt-3 w-100"
              >
                Submit
              </button>
            </form>
          </SecondPart>
        </MessageUs>
      </Main>
      {user?.isAdmin && (
        <Link
          // onClick={() => dispatch}
          to="/messages"
          className="messages"
        >
          <img
            style={{ width: "50px" }}
            src="https://cdn-icons-png.flaticon.com/512/865/865771.png"
            alt=""
          />
          {clinetComments.length > 0 && <span>{clinetComments.length}</span>}
        </Link>
      )}
    </Holder>
  );
};
const Holder = styled.div`
  z-index: -121212;
  & .messages {
    position: fixed;
    left: 10px;
    bottom: 10px;
    & span {
      position: absolute;
      bottom: 32px;
      right: -3px;
      color: white;
      background-color: red;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
const Main = styled.div`
  padding-top: 80px;
  min-height: 100vh;
`;
const SocialContainer = styled.div``;
const SocialItem = styled.div`
  text-align: center;
  & img {
    // width: 75px;
    border-radius: 50%;
    background-color: #ccc;
    padding: 17px;
    width: 84px;
    box-shadow: gray;
    box-shadow: 12px 12px 10px 1px #808080ad;
    margin-bottom: 10px;
  }
  & h4 {
    font-weight: bold;
    margin-top: 10px;
  }
  & p {
    margin-bottom: 2px;
  }
`;
const MessageUs = styled.div``;
const FirstPart = styled.div``;
const SecondPart = styled.div`
  & .my-feild {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #eee;
    outline: none;
    padding: 5px;
  }
  & textarea {
    resize: none;
    min-height: 150px;
  }
`;
export default ContactUs;
