import React from "react";
import SidebarDashboard from "./SidebarDashboard";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryApi } from "../redux/apiCalls/categoryApiCall";
export const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);
  const deleteCategory = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategoryApi(categoryId));
      }
    });
  };

  // }
  // });
  // };
  return (
    <div className="row">
      {/* <div className="col-2 d-none d-md-block" style={{ marginTop: "80px" }}>
        <SidebarDashboard />
      </div> */}
      <div
        className=" col-12 col-md-10 container table-responsive"
        style={{ marginTop: "80px" }}
      >
        <table className="table" style={{ minWidth: "650px" }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">count</th>
              <th scope="col">Category title</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item?.branchTitle}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => deleteCategory(item._id)}
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
