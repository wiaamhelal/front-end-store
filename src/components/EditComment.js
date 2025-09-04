import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import styled from "styled-components";
import {updateCommentApi} from "../redux/apiCalls/commentApiCall";

const EditComment = ({commetnttoggle, setcommenttoggle, mycomment}) => {
  const [text, settext] = useState(mycomment?.text);
  const dispatch = useDispatch();
  const updateComment = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      return toast.error("post title is required");
    } else {
      dispatch(updateCommentApi(mycomment?._id, {text}));
      setcommenttoggle(false);
    }
  };
  return (
    <Main>
      <div
        className="modal"
        tabindex="-1"
        style={commetnttoggle ? {display: "block"} : {display: "none"}}
      >
        <div className="modal-dialog" style={{animation: "fade 0.5s"}}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Comment</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setcommenttoggle(false)}
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="title"
                className="input"
                onChange={(e) => settext(e.target.value)}
                value={text}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setcommenttoggle(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={updateComment}
              >
                Edit Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

const Main = styled.div`
  & .input {
    padding: 5px;
    border-radius: 6px;
    border: 1px solid #ccc;
    outline: none;
    display: block;
    width: 100%;
    resize: none;
    margin-bottom: 10px;
  }
`;
export default EditComment;
