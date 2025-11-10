import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getRetunedOrdersApi,
  sendEmailCinfirmReturnApi,
  sendEmailRejectReturnApi,
} from "../redux/apiCalls/postApiCall";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

const ToggleResponceRejected = ({ toggle, settoggle, item }) => {
  const [selected, setSelected] = useState(null);
  const { returnOrdes } = useSelector((state) => state.post);
  const dispatch = useDispatch();
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

  const diclineReturn = () => {
    swal({
      title: "Are you sure?",
      text: "are you sure you want to dicline this order!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          sendEmailRejectReturnApi({
            userEmail: item.user.email,
            orderName: item.title,
            returnReason: selected,
            id: item._id,
          })
        );
        settoggle(null);
      }
    });
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
              <h5 className="modal-title">decline Return Order</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => settoggle(null)}
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-form">
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
                      checked={
                        selected === "this order violates the return policy"
                      }
                      onChange={() =>
                        handleCheck("this order violates the return policy")
                      }
                    />
                    this order violates the return policy
                  </label>
                </div>
                <div>
                  <label className="d-flex align-items-center">
                    <input
                      className="me-2"
                      type="checkbox"
                      checked={
                        selected ===
                        "this order has been receved to you in long time"
                      }
                      onChange={() =>
                        handleCheck(
                          "this order has been receved to you in long time"
                        )
                      }
                    />
                    this order has been receved to you in long time
                  </label>
                </div>
                {/* <label>
                  inter witch item you want to return and the reason
                </label> */}
                <label>other reason :</label>
                <textarea
                  onChange={(e) => setSelected(e.target.value)}
                  className="input"
                  disabled={
                    selected ===
                      "this order has been receved to you in long time" ||
                    selected === "this order violates the return policy"
                  }
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
                Cansel
              </button>
              <button
                type="button"
                className="btn btn-success rounded-pill"
                onClick={dispatch(
                  sendEmailCinfirmReturnApi({
                    userEmail: item.user.email,
                    orderName: item.title,
                    returnReason: selected,
                    id: item._id,
                  })
                )}
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
`;

export default ToggleResponceRejected;
