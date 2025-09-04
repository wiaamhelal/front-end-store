import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import {
  createNewReturnOrderApi,
  getRetunedOrdersApi,
  updatePostText,
} from "../redux/apiCalls/postApiCall";
import BasketItem from "./BasketItem";

const ToggleReturnOrder = ({
  title,
  images,
  likes,
  dislikes,
  description,
  price,
  id,
  orderColor,
  returnOrder,
  settoggle,
  toggle,
}) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(null);
  const [file, setfile] = useState("");
  const [file2, setfile2] = useState("");
  const [file3, setfile3] = useState("");
  const { returnOrdes } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getRetunedOrdersApi());
  }, []);
  const handleCheck = (value) => {
    if (selected === value) {
      setSelected(null); // إلغاء التحديد إذا ضغط نفس الخيار
    } else {
      setSelected(value); // تحديد الخيار المختار
    }
  };

  const HandleSubmit = async () => {
    // if ((returnOrdes?.order?.id == id) & (returnOrdes?.user == user)) {
    //   return toast.error("you alredy tequist this order for return");
    // }

    // if (
    //   returnOrdes.map(
    //     (item) => (item.order.id == id) & (item?.user?._id == user._id)
    //   )
    // ) {
    //   return toast.error("You already requested a return for this order.");
    // }
    if (!selected) {
      return toast.error("the reason is requird");
    }
    if (!file || !file2 || !file3) {
      return toast.error("the 3 images are requird");
    }
    const formData = new FormData();

    formData.append("images", file);
    formData.append("images", file2);
    formData.append("images", file3);

    formData.append(
      "order",
      JSON.stringify({
        title,
        price,
        id,
        images,
        likes,
        dislikes,
        description,
        orderColor,
        returnOrder,
      })
    );

    formData.append("reason", selected);

    await dispatch(createNewReturnOrderApi(formData));
    setSelected(null);
    setfile("");
    setfile2("");
    setfile3("");
    settoggle(false);
    toast.success("your requist has been reseved");
  };

  return (
    <Main>
      <div
        className="modal"
        tabindex="-1"
        style={toggle ? { display: "block" } : { display: "none" }}
      >
        <div
          className="modal-dialog"
          style={{ animation: "fade 0.5s", marginTop: "200px" }}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Return Order</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => settoggle(false)}
              ></button>
            </div>
            <div className="modal-body">
              <h5 className="fw-blod ms-0 mb-3">
                1- why do you need to return this product :
              </h5>
              <form className="my-form ms-3">
                {/* <div className="p-4 space-y-2">
                  <label className="d-flex align-items-center">
                    <input type="checkbox" className="me-2" />
                    <span>i dont like it</span>
                  </label>

                  <label className="d-flex align-items-center space-x-2 cursor-pointer ">
                    <input type="checkbox" className="me-2" />
                    <span>i dont like itdfddfd</span>
                  </label>
                </div> */}

                <div>
                  <label className="d-flex align-items-center">
                    <input
                      className="me-2"
                      type="checkbox"
                      checked={selected === "its not the same requirments"}
                      onChange={() =>
                        handleCheck("its not the same requirments")
                      }
                    />
                    its not the same requirments
                  </label>
                </div>
                <div>
                  <label className="d-flex align-items-center">
                    <input
                      className="me-2"
                      type="checkbox"
                      checked={selected === "broken"}
                      onChange={() => handleCheck("broken")}
                    />
                    broken
                  </label>
                </div>
                <div>
                  <label className="d-flex align-items-center">
                    <input
                      className="me-2"
                      type="checkbox"
                      checked={selected === "wrong item"}
                      onChange={() => handleCheck("wrong item")}
                    />
                    wrong item
                  </label>
                </div>
                <div>
                  <label className="d-flex align-items-center">
                    <input
                      className="me-2"
                      type="checkbox"
                      checked={selected === "i dont need it ant more"}
                      onChange={() => handleCheck("i dont need it ant more")}
                    />
                    i dont need it ant more
                  </label>
                </div>
                <label>Other reason</label>
                <textarea
                  className="inputs"
                  onChange={(e) => setSelected(e.target.value)}
                  disabled={
                    selected === "i dont need it ant more" ||
                    selected === "wrong item" ||
                    selected === "broken" ||
                    selected === "its not the same requirments"
                  }
                />

                {/* <label>
                  inter witch item you want to return and the reason
                </label> */}
                <h5 className="fw-blod mb-3 second-label">
                  2- you need to upload three photos for the product :
                </h5>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="d-none"
                  onChange={(e) => setfile(e.target.files[0])}
                />
                <label
                  htmlFor="file"
                  className="btn btn-success w-100 mb-3 mt-1"
                >
                  Chose an image
                </label>
                <div>
                  {file && (
                    <img
                      style={{
                        width: "100%",
                        maxHeight: "250px",
                        borderRadius: "10px",
                      }}
                      className="mb-3"
                      alt=""
                      src={URL.createObjectURL(file)}
                    />
                  )}
                </div>
                <input
                  type="file"
                  name="file2"
                  id="file2"
                  className="d-none"
                  onChange={(e) => setfile2(e.target.files[0])}
                />
                <label
                  htmlFor="file2"
                  className="btn btn-success w-100 mb-3 mt-1"
                >
                  Chose an image2
                </label>
                <div>
                  {file2 && (
                    <img
                      style={{
                        width: "100%",
                        maxHeight: "250px",
                        borderRadius: "10px",
                      }}
                      className="mb-3"
                      alt=""
                      src={URL.createObjectURL(file2)}
                    />
                  )}
                </div>
                <input
                  type="file"
                  name="file3"
                  id="file3"
                  className="d-none"
                  onChange={(e) => setfile3(e.target.files[0])}
                />
                <label
                  htmlFor="file3"
                  className="btn btn-success w-100 mb-3 mt-1"
                >
                  Chose an image3
                </label>
                <div>
                  {file3 && (
                    <img
                      style={{
                        width: "100%",
                        maxHeight: "250px",
                        borderRadius: "10px",
                      }}
                      className="mb-3"
                      alt=""
                      src={URL.createObjectURL(file3)}
                    />
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rounded-pill"
                data-bs-dismiss="modal"
                onClick={() => settoggle(false)}
              >
                Cansel
              </button>
              <button
                type="button"
                className="btn btn-success rounded-pill"
                onClick={HandleSubmit}
              >
                Confirm
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
  & .modal {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }

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

  & .inputs {
    padding: 5px;
    border-radius: 6px;
    border: 1px solid #ccc;
    outline: none;
    display: block;
    width: 100%;
    resize: none;
    margin-bottom: 10px;
  }
  & label {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  & .second-label {
    position: relative;
    margin-left: -1rem;
    line-height: 1.6;
  }
`;
export default ToggleReturnOrder;
