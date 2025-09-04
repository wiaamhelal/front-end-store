import React, { useState } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import EditComment from "./EditComment";
import swal from "sweetalert";
import { deleteCommentApi } from "../redux/apiCalls/commentApiCall";
import { Link } from "react-router-dom";

const CommentList = ({ comments }) => {
  const { user } = useSelector((state) => state.auth);
  const { post } = useSelector((state) => state.post);
  const [commetnttoggle, setcommenttoggle] = useState(false);
  const [mycomment, setmycomment] = useState();
  const dispatch = useDispatch();
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCommentApi(commentId));
      }
    });
  };
  const findMyComment = (comment) => {
    setmycomment(comment);
    setcommenttoggle(true);
  };

  return (
    <Main className="container ">
      <h2 className="">{comments?.length} comments</h2>
      <div className="my-line"></div>
      {comments?.map((comment) => (
        <Box className="shadow bg-light">
          <EditComment
            commetnttoggle={commetnttoggle}
            setcommenttoggle={setcommenttoggle}
            mycomment={mycomment}
          />
          <div className="d-flex align-items-center justify-content-between">
            <Link to={`/profile/${post?.user?._id}`} className="text-dark">
              <h5>{comment.username}</h5>{" "}
            </Link>

            <span>
              {
                <Moment fromNow ago>
                  {comment.createdAt}
                </Moment>
              }{" "}
              ago
            </span>
          </div>
          <p>{comment.text}</p>
          {user?._id === comment.user && (
            <div>
              <span
                className="me-3 btn btn-success btn-sm rounded-pill"
                onClick={() => findMyComment(comment)}
              >
                update
              </span>
              <span
                className="btn btn-secondary btn-sm rounded-pill"
                onClick={() => deleteCommentHandler(comment._id)}
              >
                delete
              </span>
            </div>
          )}
        </Box>
      ))}
    </Main>
  );
};
const Main = styled.div`
  h2 {
    // border-bottom: 1px solid #b1adad;
    // padding-bottom: 10px;
  }
  & .my-line {
    box-shadow: 12px 8px 7px 1px #000;
    height: 1px;
    margin-bottom: 35px;
  }
`;
const Box = styled.div`
  width: 100%;
  background: white;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export default CommentList;
