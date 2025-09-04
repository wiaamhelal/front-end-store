import React, { useEffect } from "react";
import SidebarDashboard from "./SidebarDashboard";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deletePostApi, fetchAllPosts } from "../redux/apiCalls/postApiCall";
export const PostsTable = () => {
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  const deletePost = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePostApi(postId));
        window.location.reload(false);
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
              <th scope="col">Post title</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={item.user.profilePhoto.url}
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                    className="rounded-circle"
                  />
                  <span className="ms-2">{item?.user.username}</span>
                </td>
                <td>{item?.title}</td>
                <td>
                  <Link
                    to={`/posts/details/${item?._id}`}
                    className="btn btn-success me-3 btn-sm"
                  >
                    view post
                  </Link>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => deletePost(item?._id)}
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
