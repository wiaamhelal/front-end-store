import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Comment from "./Comment";
import CommentList from "./CommentList";
import swal from "sweetalert";
import UpdatePost from "./UpdatePost";
import EditComment from "./EditComment";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostApi,
  fetchSinglePost,
  toggleLike,
  updatePostImage,
} from "../redux/apiCalls/postApiCall";

const PostPage = () => {
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [image, setimage] = useState("");
  const [toggle, settoggle] = useState(false);

  const uploadImgSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("no image chosen");
    } else {
      const formData = new FormData();
      formData.append("image", image);
      dispatch(updatePostImage(formData, post._id));
    }
  };
  const navicate = useNavigate();
  const deletePost = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePostApi(post?._id));
        navicate(`/profile/${user?._id}`);
        window.location.reload(false);
      }
    });
  };
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [id]);

  return (
    <div>
      <div className="container">
        <img
          src={image ? URL.createObjectURL(image) : post?.image.url}
          alt=""
          style={{ width: "100%", borderRadius: "20px" }}
        />
        {user?._id === post?.user._id && (
          <form>
            <input
              type="file"
              id="file"
              name="file"
              style={{ display: "none" }}
              onChange={(e) => setimage(e.target.files[0])}
            />
            <div className="d-flex align-items-center justify-content-between mt-3">
              <label htmlFor="file" className="btn btn-secondary btn-sm">
                change the image
              </label>
              <input
                onClick={uploadImgSubmit}
                type="submit"
                value="change now"
                className="btn btn-primary btn-sm"
              />
            </div>
          </form>
        )}
        <h1 className="text-center">{post?.title}</h1>
        <div className="d-flex align-items-center me-2 justify-content-center fw-bold mb-3">
          <img
            src={post?.user.profilePhoto.url}
            alt=""
            style={{ width: "40px" }}
            className="rounded-circle"
          />
          <div>
            <Link to={`/profile/${post?.user._id}`} className="d-block">
              {post?.user.username}
            </Link>
            <span>{new Date(post?.createdAt).toDateString()}</span>
          </div>
        </div>
        <p className="text-center mb-3">
          {post?.description} hi this is the discrion is face just for shawing
          some words i
        </p>
        <div className="d-flex align-items-center justify-content-between">
          <span onClick={() => dispatch(toggleLike(post?._id))}>
            {/* <img src="" alt="" style={{width: "50px"}} /> */}
            {post?.likes?.length} Likes
          </span>
          {user?._id === post?.user._id && (
            <div>
              <span
                className="btn btn-success me-3"
                onClick={() => settoggle(true)}
              >
                update
              </span>
              <span className="btn btn-danger" onClick={deletePost}>
                delete
              </span>
            </div>
          )}
        </div>
        <Comment postId={post?._id} />
        <CommentList comments={post?.comments} />
        <UpdatePost settoggle={settoggle} toggle={toggle} post={post} />
      </div>
    </div>
  );
};

export default PostPage;
