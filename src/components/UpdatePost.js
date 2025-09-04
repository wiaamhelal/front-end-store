import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { fetchSinglePost, updatePostText } from "../redux/apiCalls/postApiCall";

const UpdatePost = ({ toggle, settoggle, post, id }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const [title, settitle] = useState(post?.title);
  const [description, setdescription] = useState(post?.description);
  const [category, setcategory] = useState(post?.category);
  const [price, setprice] = useState(post?.price);
  const [dicountMount, setdiscountMount] = useState();
  const [changePrice, setchangePrice] = useState();
  console.log(categories);
  const updatePost = async (e) => {
    e.preventDefault();
    let newPrice = price;

    const discount = parseFloat(dicountMount); // تأكد من أنه رقم

    if (!isNaN(discount) && discount > 0 && discount <= 100) {
      newPrice = price - (price * discount) / 100;
    }

    if (dicountMount >= 5) {
      await dispatch(
        updatePostText(
          {
            title,
            description,
            category,
            price: newPrice,
            oldPrice: [post?.price, discount],
          },
          post._id
        )
      );
    } else {
      await dispatch(
        updatePostText(
          {
            title,
            description,
            category,
            price: changePrice,
            oldPrice: [],
          },
          post._id
        )
      );
    }

    settoggle(false);
    window.location.reload();
  };

  const discountAmount = [0, 5, 10, 15, 20, 25, 50, 75];
  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [id]);
  return (
    <Main>
      <div
        className="modal"
        tabindex="-1"
        style={toggle ? { display: "block" } : { display: "none" }}
      >
        <div
          className="modal-dialog"
          style={{ animation: "fade 0.5s", marginTop: "70px" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Post</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => settoggle(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-form" onSubmit={updatePost}>
                <input
                  type="text"
                  placeholder="title"
                  className="input"
                  onChange={(e) => settitle(e.target.value)}
                  value={title}
                />
                <select
                  className="input"
                  onChange={(e) => setcategory(e.target.value)}
                  value={category}
                >
                  {categories.map((item) => (
                    <option value={item?.branchTitle}>
                      {item?.branchTitle}
                    </option>
                  ))}
                </select>

                <textarea
                  onChange={(e) => setdescription(e.target.value)}
                  value={description}
                  className="input"
                  placeholder="description"
                  rows="5"
                ></textarea>
                <h5>create discount for the product</h5>
                <select
                  className="input"
                  onChange={(e) => setdiscountMount(e.target.value)}
                  value={dicountMount}
                  disabled={changePrice}
                >
                  {discountAmount.map((item) => (
                    <option value={item}>{item} %</option>
                  ))}
                </select>
                <h5>or change the price</h5>
                <input
                  type="number"
                  placeholder="product price"
                  className="input"
                  onChange={(e) => setchangePrice(e.target.value)}
                  // value={Math.trunc(price)}
                  disabled={dicountMount}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rounded-pill"
                data-bs-dismiss="modal"
                onClick={() => settoggle(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success rounded-pill"
                onClick={updatePost}
              >
                Update Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
const Main = styled.div`
  //   & .modal-dialog {
  //     animation: fade 0.5s;
  //   }
  & .my-form {
    display: flex;
    flex-direction: column;
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
  }
`;
export default UpdatePost;
