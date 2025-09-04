import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import happy from "../img/happy-face-2-svgrepo-com.svg";
import unhappy from "../img/unhappy-face-2-svgrepo-com.svg";
import FormatCurrency from "./FormatCurrency";
const PostItem = ({ post, username, userId }) => {
  const selectUser = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user._id}`;
  return (
    <Link
      to={`/posts/details/${post._id}`}
      class="card mt-4 border-0 row-md-6 shadow my-card col-3 p-0"
      style={{
        width: "18rem",
        textDecoration: "none",
      }}
    >
      <img
        src={post?.image?.url || post?.images[0]?.url}
        class="card-img-top"
        alt="..."
        style={{ height: "192px", objectFit: "contain" }}
      />
      <div class="card-body">
        {" "}
        <div className="" style={{ height: "48px" }}>
          <h5 class="card-title">{post?.title?.substring(0, 22)}</h5>
          <div className="d-flex align-itmes-center">
            <h6 class="card-title me-3">{FormatCurrency(post?.price)}</h6>
            {post?.oldPrice && (
              <div className=" d-flex me-auto">
                <h6 className="text-decoration-line-through text-muted me-2">
                  {FormatCurrency(post?.oldPrice[0])}
                </h6>
                <h6 className="fw-bold m-0 p-0 text-danger">
                  {post?.oldPrice[1]} -%
                </h6>
              </div>
            )}
          </div>
        </div>
        <p class="card-text" style={{ height: "96px" }}>
          {post?.description?.substring(0, 120)}...
        </p>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <img src={happy} alt="" style={{ width: "40px" }} />{" "}
            <span>{post?.likes.length}</span>
          </div>
          <div>
            <img src={unhappy} alt="" style={{ width: "40px" }} />{" "}
            <span>{post?.dislikes.length}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default PostItem;
