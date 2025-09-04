import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { updateProfile } from "../redux/apiCalls/profileApiCall";

const UpdateProfile = ({ setprofiletoggle, profiletoggle }) => {
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [username, setusername] = useState(profile.username);
  const [bio, setbio] = useState(profile.bio);
  const [password, setpassword] = useState("");

  const updatePost = (e) => {
    e.preventDefault();
    const updatedUser = { username, bio };

    if (password.trim() !== "") {
      updatedUser.password = password;
    }
    dispatch(updateProfile(profile._id, updatedUser));
    setprofiletoggle(false);
  };
  return (
    <Main>
      <div
        className="modal"
        tabindex="-1"
        style={profiletoggle ? { display: "block" } : { display: "none" }}
      >
        <div className="modal-dialog" style={{ animation: "fade 0.5s" }}>
          <div className="modal-content" style={{ marginTop: "80px" }}>
            <div className="modal-header">
              <h5 className="modal-title">Update Your Profile</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setprofiletoggle(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-form" onSubmit={updatePost}>
                <input
                  type="text"
                  placeholder="user name"
                  className="input"
                  onChange={(e) => setusername(e.target.value)}
                  value={username}
                />
                <input
                  type="text"
                  placeholder="inter the bio"
                  className="input"
                  onChange={(e) => setbio(e.target.value)}
                  value={bio}
                />
                <input
                  type="password"
                  placeholder="password"
                  className="input"
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rounded-pill"
                data-bs-dismiss="modal"
                onClick={() => setprofiletoggle(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success rounded-pill"
                onClick={updatePost}
              >
                Update Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
const Main = styled.div`
  // margin-top: 70px;
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
export default UpdateProfile;
