import React from "react";
import SidebarDashboard from "./SidebarDashboard";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentApi } from "../redux/apiCalls/commentApiCall";
export const CommentsTable = () => {
  const { comments } = useSelector((state) => state.comment);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const deleteComment = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCommentApi(commentId));
      }
    });
  };
  return (
    <div className="row">
      <div className="col-2 d-none d-md-block " style={{ marginTop: "80px" }}>
        <SidebarDashboard />
      </div>
      <div
        className=" col-12 col-md-10 container table-responsive"
        style={{ marginTop: "80px" }}
      >
        <table className="table" style={{ minWidth: "650px" }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">count</th>
              <th scope="col">User</th>
              <th scope="col">Comment</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={item.user.profilePhoto.url}
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                    className="rounded-circle"
                  />
                  <span className="ms-2">{item.user.username}</span>
                </td>
                <td>{item.text}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => deleteComment(item._id)}
                    disabled={user.email !== "weaam224112@gmail.com"}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
