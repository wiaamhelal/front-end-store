import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  AllCommentsClintsApi,
  deleteAllClinetsComments,
  deleteClinetsComment,
} from "../redux/apiCalls/commentApiCall";
import swal from "sweetalert";

const Messages = () => {
  const [message, setmessage] = useState([]);
  const dispatch = useDispatch();
  const { clinetComments } = useSelector((state) => state.comment);
  const DeleteComment = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteClinetsComment(id));
      }
    });
  };
  const DeleteAll = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover all this imaginary comments!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteAllClinetsComments());
      }
    });
  };
  useEffect(() => {
    dispatch(AllCommentsClintsApi());
  }, [clinetComments]);

  return (
    <Holder>
      <button
        className="btn w-100 btn-secondary m-auto rounded-pill mb-3"
        onClick={DeleteAll}
      >
        Clear All
      </button>
      {clinetComments?.map((item) => (
        <Main className="container mb-3" style={{ position: "relative" }}>
          <div className="d-flex align-items-center  ">
            <img
              src={item.imageURL}
              alt=""
              className="me-2 rounded-circle"
              style={{ width: "60px", height: "60px" }}
            />
            <div>
              <span className="d-block fw-bold">{item.username}</span>
              <span className="fw-bold mb-1">{item.email}</span>
              <p className="">{item.text}</p>
            </div>
          </div>
          <button
            onClick={() => DeleteComment(item._id)}
            className="btn btn-sm btn-secondary"
            style={{ right: "10px", top: "10px", position: "absolute" }}
          >
            Delete
          </button>
        </Main>
      ))}
    </Holder>
  );
};
const Holder = styled.div`
  z-index: -121212;
  padding-top: 80px;
  min-height: 100vh;
`;
const Main = styled.div`
  background-color: #80808038;
  border-radius: 15px;
  padding: 10px;
  & p {
    background-color: #eeeeee9e;
    padding: 3px;
    border-radius: 6px;
    margin-top: 5px;
  }
`;
export default Messages;
