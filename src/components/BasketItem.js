import React, { useState } from "react";
import styled from "styled-components";
import normalLike from "../img/like-svgrepo-com (3).svg";
import normaDislLike from "../img/dislike-svgrepo-com.svg";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import formatCurrency from "./FormatCurrency";
import { postActions } from "../redux/slices/postSlice";
import swal from "sweetalert";
import ToggleReturnOrder from "./ToggleReturnOrder";

const BasketItem = ({
  title,
  images,
  image,
  likes,
  dislikes,
  description,
  price,
  id,
  showbutton,
  orderColor,
  returnOrder,
  waranty,
  // toggle,
  // settoggle,
}) => {
  const dispatch = useDispatch();
  const [toggle, settoggle] = useState(false);
  console.log(waranty);
  const ReturnOrder = () => {
    swal({
      title: "Are you sure?",
      text: "you want to return this order once you return you cant take it back",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willdo) => {
      if (willdo) {
        settoggle(true);
      }
    });
  };

  return (
    <Main className="position-relative">
      <Link to={`/posts/details/${id}`} style={{ textDecoration: "none" }}>
        <Item className="bg-light rounded row position-relative shadow mb-3 mb-md-4">
          <img
            className="col-4 rounded"
            src={image ? image?.url : images[0]?.url}
            alt=""
          />

          <div className="position-relative col-8">
            <div className="d-flex align-items-center justify-content-between">
              <span className="fw-bold title text-decor-none text-dark">
                {title} ({orderColor})
              </span>
              {waranty ===
                "1-Year Extended Warranty by Salama Care(E-mail delivery) for AED 40.00" && (
                <span className="fw-bold price text-decor-none text-dark">
                  {formatCurrency(price + 40)}
                </span>
              )}
              {waranty ===
                "2-Year Extended Warranty by Salama Care(E-mail delivery) for AED 66.00" && (
                <span className="fw-bold price text-decor-none text-dark">
                  {formatCurrency(price + 66)}
                </span>
              )}
            </div>
            <p class="text-secondary desc mt-sm-2">
              {description?.substring(0, 60)}
              ...{" "}
            </p>
            {waranty && (
              <p className="text-dark">{waranty?.substring(0, 39)}</p>
            )}

            <div className="d-none d-sm-flex mt-sm-4 likes-div">
              {" "}
              <div className="me-3 d-flex align-items-center">
                <img src={normalLike} className="likes-img me-2" alt="" />{" "}
                <span>{likes?.length}</span>
              </div>
              <div className="d-flex align-items-center">
                <img src={normaDislLike} className="likes-img me-2" alt="" />{" "}
                <span>{dislikes?.length}</span>
              </div>
            </div>
          </div>
        </Item>
      </Link>
      {showbutton && (
        <button
          onClick={() => dispatch(postActions.deleteBasketItem(id))}
          className="btn btn-sm btn-secondary position-absolute"
          style={{ bottom: "5px", right: "0px", width: "fit-content" }}
        >
          delete
        </button>
      )}
      {returnOrder && (
        <button
          onClick={ReturnOrder}
          // onClick={() => dispatch(postActions.deleteBasketItem(id))}
          className="btn btn-sm btn-secondary position-absolute return-button"
          style={{ bottom: "5px", right: "0px", width: "fit-content" }}
        >
          Return order
        </button>
      )}
      <ToggleReturnOrder
        toggle={toggle}
        settoggle={settoggle}
        title={title}
        price={price}
        id={id}
        images={images}
        likes={likes}
        dislikes={dislikes}
        orderColor={orderColor}
        description={description}
      />
    </Main>
  );
};

const Main = styled.div`
  & .return-button {
    background-image: linear-gradient(90deg, black 17%, #737373);
    border: none;
    color: white;
    opacity: 0.8;
    font-weight: bold;
    @media (max-width: 767px) {
      font-size: 10px;
    }
  }
`;

const Item = styled.div`
  & .text-decor-none {
    text-decoration: none;
  }
  & .title {
    @media (min-width: 767px) {
      font-size: 20px;
    }
  }
  & .desc {
    @media (max-width: 767px) {
      font-size: 12px;
    }
  }
  & .price {
    @media (max-width: 767px) {
      font-size: 13px;
    }
  }
  & img {
    border-radius: px;
    object-fit: cover;
    padding-left: 0px;

    @media (max-width: 767px) {
      height: 100px;
    }
    @media (min-width: 767px) {
      height: 150px;
    }
  }
  & .likes-img {
    width: 20px;
    object-fit: contain;
    height: fit-content;
  }
  .likes-div {
    position: absolute;
    bottom: 8px;
  }
`;
export default BasketItem;
