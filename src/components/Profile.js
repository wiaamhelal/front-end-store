import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfile from "./UpdateProfile.js";
import { useDispatch, useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import {
  changeProfilePhoto,
  deleteProfileApi,
  getUserProfile,
  toggleUserDisLikeApi,
  toggleUserLikeApi,
  userRateApi,
} from "../redux/apiCalls/profileApiCall.js";
import { useNavigate, useParams } from "react-router-dom";
import PostList from "./PostList.js";
import PostItem from "./PostItem.js";
import { logoutUser } from "../redux/apiCalls/authApiCall.js";
import styled from "styled-components";
import { authActions } from "../redux/slices/authSlice.js";
import Paganation from "./Paganation.js";
import { fetchPosts } from "../redux/apiCalls/postApiCall.js";
import boldLike from "../img/like-svgrepo-com (2).svg";
import normalLike from "../img/like-svgrepo-com (3).svg";
import boldDisLike from "../img/dislike-svgrepo-com (1).svg";
import normaDislLike from "../img/dislike-svgrepo-com.svg";
import boldStar from "../img/star (1).png";
import { profileActions } from "../redux/slices/profileSlice.js";
const Profile = () => {
  const { profile, loading, isProfileDeleted, sliceRate } = useSelector(
    (state) => state.profile
  );

  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const myposts = posts?.filter((item) => item?.user?.email === profile?.email);

  const { userId } = useParams();
  const dispatch = useDispatch();

  const likeToggle = () => {
    if (!user) {
      return toast.error("you have to sign in first");
    } else {
      dispatch(toggleUserLikeApi(userId));
    }
  };

  const dislikeToggle = () => {
    if (!user) {
      return toast.error("you have to sign in first");
    } else {
      dispatch(toggleUserDisLikeApi(userId));
    }
  };

  const navicate = useNavigate();
  useEffect(() => {
    if (isProfileDeleted) {
      navicate("/");
    }
  }, [isProfileDeleted]);

  const [profiletoggle, setprofiletoggle] = useState(false);
  const deleteAcount = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfileApi(user?._id));
        dispatch(logoutUser());
      }
    });
  };
  const [file, setfile] = useState(null);
  const ChangePhoto = async (e) => {
    e.preventDefault();
    if (!file) {
      return toast.error("no image provided");
    } else {
      dispatch(authActions.setLoadingApp(true));
      const formData = new FormData();
      formData.append("image", file);
      await dispatch(changeProfilePhoto(formData));
      setfile(null);
      dispatch(authActions.setLoadingApp(false));
    }
  };

  const POST_PER_PAGE = 8;

  const [currentPage, setcurrentPage] = useState(1);
  const pages = Math.ceil(profile?.posts?.length / POST_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
  }, [currentPage]);

  let rate =
    (profile?.likes?.length /
      (profile?.dislikes?.length + profile?.likes?.length)) *
    5;

  useEffect(() => {
    dispatch(getUserProfile(userId));
  }, [userId]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Oval
          visible={true}
          height="120"
          width="120"
          color="#4fa94d"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <Main>
      <div
        className=" rounded text-center backdiv my-shadw mb-4"
        style={{ position: "relative" }}
      >
        <BackUserImg
          className="back-user-img"
          src="https://images.unsplash.com/photo-1562065540-efa93744ed71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div
          className="position-relative m-auto"
          style={{ width: "fit-content" }}
        >
          <img
            className="rounded-circle mt-3"
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
            alt=""
            style={{ width: "85px", maxWidth: "100%", height: "85px" }}
          />
          {user?._id === profile?._id && (
            <form>
              <input
                type="file"
                id="file"
                onChange={(e) => setfile(e.target.files[0])}
                style={{ display: "none" }}
              />
              <label
                htmlFor="file"
                className=" fw-bold position-absolute btn btn-sm btn-success rounded-circle my-label"
              >
                +
              </label>
              {file && (
                <span
                  className="btn btn-success rounded-pill"
                  style={{ position: "absolute", top: "0" }}
                  onClick={ChangePhoto}
                >
                  submit
                </span>
              )}
            </form>
          )}
        </div>
        <h2 className="text-dark position-relative">{profile?.username}</h2>
        <p className="position-relative fw-bold">
          {profile?.bio?.substring(0, 100)}
        </p>
        <h5 className="text-secondary position-relative">
          {" "}
          {new Date(profile?.createdAt).toDateString()}
        </h5>
        {user?._id === profile?._id && (
          <button
            className="btn btn-sm btn-success rounded-pill position-relative mt-2"
            onClick={() => setprofiletoggle(true)}
          >
            Update Profile
          </button>
        )}
        <Rate>
          {" "}
          <div className="">
            {" "}
            {Array(Math.round(rate) || 0)
              .fill()
              .map((_, i) => (
                <img src={boldStar} alt="star" className="star-img" />
              ))}
          </div>
        </Rate>
        <Like>
          <span
            className="d-flex justify-content-center"
            style={{ flexDirection: "column" }}
          >
            <img src="" alt="" />
            <div onClick={() => likeToggle()} style={{ cursor: "pointer" }}>
              {profile?.likes?.includes(user?._id) ? (
                <img src={normalLike} alt="" />
              ) : (
                <img src={boldLike} alt="" />
              )}
            </div>
            <span className="fw-bold text-secondary m-auto mt-1">
              {profile?.likes?.length}
            </span>
          </span>

          <span
            className="d-flex justify-content-center"
            style={{ flexDirection: "column" }}
          >
            <div style={{ cursor: "pointer" }} onClick={() => dislikeToggle()}>
              {profile?.dislikes?.includes(user?._id) ? (
                <img src={normaDislLike} alt="" />
              ) : (
                <img src={boldDisLike} alt="" />
              )}
            </div>
            <span className="fw-bold text-secondary m-auto">
              {profile?.dislikes?.length}
            </span>
          </span>
        </Like>
      </div>

      <h2 className="">{profile?.username} Products :</h2>
      <div className="justify-content-center row gap-3">
        {myposts?.map((item) => (
          <PostItem
            className="col-12 col-sm-6 col-md-4 col-lg-3"
            post={item}
            username={profile?.username}
            userId={profile?._id}
          />
        ))}

        <Paganation
          currentPage={currentPage}
          setcurrentPage={setcurrentPage}
          pages={pages}
        />
      </div>
      {user?._id === profile?._id && (
        <button
          className="btn btn-secondary mb-3 ms-3 mt-3 rounded-pill"
          onClick={deleteAcount}
        >
          delete profile
        </button>
      )}
      {user?._id !== userId && (
        <div className="ms-3">
          <span className="me-2 fw-bold">Contact The Client</span>
          <img
            style={{ width: " 50px", cursor: "pointer" }}
            src="https://cdn-icons-png.flaticon.com/512/3178/3178158.png"
            alt=""
            className="me-3"
            onClick={() => (window.location.href = `mailto:${profile?.email}`)}
          />
        </div>
      )}

      {profiletoggle && (
        <UpdateProfile
          setprofiletoggle={setprofiletoggle}
          profiletoggle={profiletoggle}
        />
      )}
    </Main>
  );
};
const BackUserImg = styled.img`
  width: 100%;
  position: absolute;
  left: 0;
  /* height: 278px; */
  height: 100%;
  opacity: 0.3;
`;

const Main = styled.div`
  padding-top: 56px;
  & .backdiv {
    height: 300px;
  }
  & .my-label {
    right: 0px;
    bottom: 0px;
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const Like = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;

  & img {
    width: 40px;
  }
`;
const Rate = styled.div`
  position: relative;
  & .star-img {
    width: 22px;
    margin-right: 10px;
}
  }
`;
export default Profile;
