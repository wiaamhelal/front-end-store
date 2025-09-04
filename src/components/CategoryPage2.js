import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Paganation from "./Paganation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  fetchPostsByCategory,
  getPostsCount,
} from "../redux/apiCalls/postApiCall";
import { SideBar } from "./SideBar";
import { useParams } from "react-router-dom";
const CategoryPage2 = () => {
  const { postsCount, postsCate } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const POST_PER_PAGE = 3;

  const [currentPage, setcurrentPage] = useState(1);
  const pages = Math.ceil(postsCate.length / POST_PER_PAGE);

  useEffect(() => {
    dispatch(getPostsCount());
  }, [getPostsCount]);

  const { branchTitle } = useParams();

  useEffect(() => {
    dispatch(fetchPostsByCategory(branchTitle));
  }, [branchTitle]);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
  }, [currentPage]);

  return (
    <div>
      <div className="container" style={{ paddingTop: "70px" }}>
        {/* <SideBar /> */}
        <div className="row  gap-3 justify-content-center">
          {postsCate.map((item) => (
            <PostItem post={item} key={item._id} />
          ))}
        </div>
      </div>
      <div className="col-12 mt-3">
        {postsCate.length > 2 && (
          <Paganation
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
            pages={pages}
          />
        )}
      </div>
    </div>
  );
};

export default CategoryPage2;
