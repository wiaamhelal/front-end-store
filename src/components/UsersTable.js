import React, { useEffect } from "react";
import SidebarDashboard from "./SidebarDashboard";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import {
  changeUserAuthApi,
  deleteProfileApi,
  getAllProfilesApi,
} from "../redux/apiCalls/profileApiCall";
export const UsersTable = () => {
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProfilesApi());
  }, [isProfileDeleted]);
  const deleteUser = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfileApi(userId));
      }
    });
  };
  const submitChangeAdmin = async (userId, isAdmin) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure you want to change the authentication to this user",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((ifistrue) => {
      if (ifistrue) {
        dispatch(changeUserAuthApi(userId, { isAdmin: isAdmin })).then(() =>
          window.location.reload(false)
        );
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
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((item, index) => (
              <tr className="">
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={item.profilePhoto.url}
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                    className="rounded-circle"
                  />
                  <span className="ms-2">{item?.username}</span>
                </td>
                <td>{item?.email}</td>
                <td>
                  <Link
                    to={`/profile/${item?._id}`}
                    className="btn btn-success me-3 btn-sm"
                  >
                    view profile
                  </Link>
                  <button
                    className="btn btn-secondary btn-sm me-3"
                    onClick={() => deleteUser(item?._id)}
                    disabled={user.email !== "weaam224112@gmail.com"}
                  >
                    delete
                  </button>
                  {item?.isAdmin === false ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => submitChangeAdmin(item._id, true)}
                    >
                      Promotion To Admin
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => submitChangeAdmin(item._id, false)}
                    >
                      Demotion To User
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
