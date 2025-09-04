import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { createNewComment } from "../redux/apiCalls/commentApiCall";

const Comment = ({ postId }) => {
  const { user } = useSelector((state) => state.auth);
  const [text, settext] = useState("");
  const dispatch = useDispatch();
  const sedComment = (e) => {
    e.preventDefault();
    if (!user) {
      return toast.error("you have to sign in first");
    }
    if (text === "") {
      toast.error("write your comment first");
    } else {
      dispatch(createNewComment({ text, postId }));
      settext("");
    }
  };
  return (
    <Comments>
      <form onSubmit={sedComment}>
        {" "}
        <input
          type="text"
          placeholder="Leave a comment"
          value={text}
          onChange={(e) => settext(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </Comments>
  );
};
const Comments = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  margin-bottom: 20px;
  border-top: 1px solid #ccc;
  & form {
    display: flex;
    justify-content: center;
  }
  & input {
    border: 1px solid #ccc;
    border-right: none;
    background-color: white;
    // border-radius: 6px 0 0 6px;
    border-radius: 6px;
    padding: 3px;
    outline: none;
  }
  & button {
    // border-radius: 0 6px 6px 0;
    border-radius: 6px;
    padding: 3px;
    border: 1px solid #ccc;
    border-left: none;
  }
`;
export default Comment;
