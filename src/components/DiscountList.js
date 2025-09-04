import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAdApi, getAllAdsApi } from "../redux/apiCalls/categoryApiCall";

const DiscountList = () => {
  const dispatch = useDispatch();
  const { productad } = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getAllAdsApi());
  }, []);
  return (
    <div>
      <div
        className=" col-12 col-md-10 container table-responsive"
        style={{ marginTop: "80px" }}
      >
        <table className="table" style={{ minWidth: "650px" }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">count</th>
              <th scope="col">dicount amount</th>
              <th scope="col">category ad</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {productad?.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  {/* <img
                    src={item?.user?.profilePhoto?.url}
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                    className="rounded-circle"
                  /> */}
                  <span className="ms-2">{item?.range} %</span>
                </td>
                <td>{item?.category}</td>
                <td>
                  <Link
                    to={`/products/main/${item?.category}`}
                    className="btn btn-success me-3 btn-sm"
                  >
                    view category
                  </Link>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => dispatch(deleteAdApi(item._id))}
                    // disabled={item?.user?.email !== "weaam224112@gmail.com"}
                  >
                    delete ad
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

export default DiscountList;
