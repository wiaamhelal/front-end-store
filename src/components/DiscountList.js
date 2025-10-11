import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAdApi, getAllAdsApi } from "../redux/apiCalls/categoryApiCall";
import {
  deleteProductAdApi,
  getAllProuctsAdsApi,
} from "../redux/apiCalls/postApiCall";

const DiscountList = () => {
  const dispatch = useDispatch();
  const { productad } = useSelector((state) => state.category);
  const { postsAd } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getAllAdsApi());
    dispatch(getAllProuctsAdsApi());
  }, []);
  console.log(postsAd);
  return (
    <div>
      <h1 className=" mt-5 pt-3 mb-4 container">Categories AD</h1>
      <div
        className=" col-12 col-md-10 container table-responsive"
        style={{ marginTop: "0px" }}
      >
        <table className="table" style={{ minWidth: "650px" }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">count</th>
              <th scope="col">dicount amount</th>
              <th scope="col">category ad</th>
              <th scope="col" className="flex-end ">
                Action
              </th>
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
                <td className="flex-end ">
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
      <div
        className=" col-12 col-md-10 container table-responsive"
        style={{ marginTop: "80px" }}
      >
        <h1 className=" mb-4 container">Products AD</h1>
        <table className="table" style={{ minWidth: "650px" }}>
          <thead className="thead-dark">
            <tr>
              <th scope="col">count</th>
              <th scope="col">dicount amount</th>
              <th scope="col">Product ad</th>
              <th scope="col" className="flex-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {postsAd?.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>
                  <span className="ms-2">{item?.order?.oldPrice[1]} %</span>
                </td>
                <td>{item?.order?.title}</td>
                <td className="flex-end ">
                  <Link
                    to={`/products/main/${item?.category}`}
                    className="btn btn-success me-3 btn-sm"
                  >
                    view category
                  </Link>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => dispatch(deleteProductAdApi(item._id))}
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
