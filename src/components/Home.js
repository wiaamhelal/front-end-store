import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  fitchAllCategories,
  getAllAdsApi,
} from "../redux/apiCalls/categoryApiCall";
import { fetchPosts, getAllProuctsAdsApi } from "../redux/apiCalls/postApiCall";
import addimg1 from "../img/WhatsApp Image 2025-09-01 at 02.49.26_4a5a5fe6.jpg";
import PostItem from "./PostItem";
import { logoutUser } from "../redux/apiCalls/authApiCall";

const Home = () => {
  const { categories, productad } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);
  const { orders, allMaxOrders, postsAd, posts } = useSelector(
    (state) => state.post
  );
  const navicate = useNavigate();
  const dispatch = useDispatch();
  // إنشاء مجموعة (Set) للاحتفاظ فقط بـ `mainTitle` الفريد
  const uniqueMainTitles = new Set();

  // تصفية العناصر بحيث يتم الاحتفاظ فقط بأول قيمة فريدة لـ `mainTitle`
  const filteredItems = categories.filter((item) => {
    if (item.mainTitle && !uniqueMainTitles.has(item.mainTitle)) {
      uniqueMainTitles.add(item.mainTitle);
      return true;
    }
    return false;
  });
  useEffect(() => {
    dispatch(fitchAllCategories());
    // dispatch(getAllProfilesApi());
    // dispatch(getAllOrdersApi());
    // dispatch(getMaxAllOrdersApi());
    dispatch(fetchPosts(1));
    dispatch(getAllAdsApi());
    dispatch(getAllProuctsAdsApi());
  }, []);
  console.log(filteredItems);

  return (
    <Main className="text-dark">
      <SecondHeder className="ps-2 d-none d-sm-block">
        <div className="over">
          {filteredItems?.map((item, index) => (
            <Link key={index} to={`/products/main/${item?.mainTitle}`}>
              {item?.mainTitle}
            </Link>
          ))}
        </div>
      </SecondHeder>
      <SecondHederSmall className=" d-block d-sm-none">
        <div style={{ overflowX: "auto" }}>
          <div className="box-holder">
            {filteredItems?.map((item, index) => (
              <Link
                className="box"
                key={index}
                to={`/products/main/${item?.mainTitle}`}
              >
                <img src={item?.images[0].url} alt="" />
                <p>{item?.mainTitle.substring(0, 9)}..</p>
              </Link>
            ))}
          </div>
        </div>
      </SecondHederSmall>
      <div
        id="carouselExampleControls"
        class="carousel slide pt-sm-5 mt-sm-1"
        data-bs-ride="carousel"
        style={{
          // transform: "translateY(53px)",
          maskImage: "linear-gradient(180deg, #000 80%, transparent)",
        }}
      >
        <div class="carousel-inner" onClick={() => navicate("/products")}>
          <div class="carousel-item active">
            <img
              src="https://m.media-amazon.com/images/I/71YaYuDhd3L._SX3000_.jpg"
              class=" w-100  d-block"
              alt="..."
            />
            {/* <img src={addimg1} class=" w-100 d-block sm-none" alt="..." /> */}
          </div>
          <div class="carousel-item">
            <img
              src="https://m.media-amazon.com/images/I/519mt4QM9rL._SX3000_.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://m.media-amazon.com/images/I/61AUWdCogHL._SX3000_.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://m.media-amazon.com/images/I/71e5i44D-0L._SX3000_.jpg"
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div style={{ overflowX: "auto", marginBottom: "40px" }}>
        <BoxesHolder className="my-container ">
          {postsAd?.slice(-4).map((item) => (
            <div
              className=" box shadow "
              onClick={() => navicate(`/posts/details/${item?.order?._id}`)}
            >
              <h5 className="fw-bold">{item?.order?.oldPrice[1]} % discount</h5>

              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="me-3">
                  <img src={item?.order?.images[0]?.url} alt="" />
                  <span className="d-block">limited ofer</span>
                </div>
                <div>
                  <img src={item?.order?.images[1]?.url} alt="" />
                  <span className="d-block">limited quantity</span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="me-3">
                  <img src={item?.order?.images[2]?.url} alt="" />
                  <span className="d-block">best price</span>
                </div>
                <div>
                  <img src={item?.order?.images[3]?.url} alt="" />
                  <span className="d-block">try it now</span>
                </div>
              </div>
            </div>
          ))}
        </BoxesHolder>
      </div>
      <div
        style={{ overflowX: "auto", height: "268px" }}
        className="my-container"
      >
        <div className="category row">
          {productad.map((item) => (
            <Link
              className="child-cate col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              to={`/products/main/${item?.category}`}
            >
              <div class="card" style={{ width: "18rem" }}>
                <img src={item.url} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h4 class="card-text">
                    discount up to {item?.range} % on {item?.category}
                  </h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Premium className="my-container mt-4">
        <h4 className="fw-bold  pt-3">
          Just for Premium users | Use code: SAVE15
        </h4>
        <div style={{ overflowX: "auto" }}>
          <div className="posts-container">
            {posts
              ?.filter((item) => item?.premium === true)
              .slice(0, 20)
              .map((item) => (
                <PostItem post={item} key={item?._id} />
              ))}
          </div>
        </div>
      </Premium>
      <Premium className="my-container mt-4">
        <h4 className="fw-bold  pt-3">Welcome Deals | Under AED 99</h4>
        <div style={{ overflowX: "auto" }}>
          {/* <div className="posts-container">
            {posts?.map((item) => (
              <PostItem post={item} key={item?._id} />
            ))}
          </div> */}
          <div className="posts-container">
            {posts
              ?.filter((item) => item?.price < 100)
              .slice(0, 20)
              .map((item) => (
                <PostItem post={item} key={item?._id} />
              ))}
          </div>
        </div>
      </Premium>
      <div style={{ overflowX: "auto", marginBottom: "20px" }}>
        <BoxesHolder className="my-container mt-4">
          {postsAd?.slice(-8, -4).map((item) => (
            <div
              className=" box shadow "
              onClick={() => navicate(`/posts/details/${item?.order?._id}`)}
            >
              <h5 className="fw-bold">{item?.order?.oldPrice[1]} % discount</h5>

              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="me-3">
                  <img src={item?.order?.images[0]?.url} alt="" />
                  <span className="d-block">limited ofer</span>
                </div>
                <div>
                  <img src={item?.order?.images[1]?.url} alt="" />
                  <span className="d-block">limited quantity</span>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="me-3">
                  <img src={item?.order?.images[2]?.url} alt="" />
                  <span className="d-block">best price</span>
                </div>
                <div>
                  <img src={item?.order?.images[3]?.url} alt="" />
                  <span className="d-block">try it now</span>
                </div>
              </div>
            </div>
          ))}
        </BoxesHolder>
      </div>
      {/* <SerculItems className="my-container mt-4">
        <h4 className="fw-bold  pt-3 pb-3">
          Welcome Deals | Pick up where you left off
        </h4>
        <div style={{ overflowX: "auto" }}>
          <div className="posts-container">
            {categories?.map((item) => (
              <div>
                <img
                  src={
                    item?.images[1]?.url
                      ? item?.images[1]?.url
                      : item?.images[0]?.url
                  }
                  alt=""
                />
                <h5>{item?.branchTitle}</h5>
              </div>
            ))}
          </div>
        </div>
      </SerculItems> */}
      <SerculItems className="my-container mt-4">
        <h4 className="fw-bold  pt-3 pb-3">
          Welcome Deals | Pick up where you left off
        </h4>
        <div style={{ overflowX: "auto" }}>
          <div className="posts-container">
            {filteredItems?.map((item) => (
              <div>
                <img src={item?.images[1]?.url} alt="" />
                <h5>{item?.branchTitle}</h5>
              </div>
            ))}
          </div>
        </div>
      </SerculItems>
      <Premium className="my-container mt-4">
        <h4 className="fw-bold  pt-3">New Products</h4>
        <div style={{ overflowX: "auto" }}>
          <div className="posts-container">
            {posts
              ?.filter(
                (item, index, self) =>
                  index === self.findIndex((obj) => obj.title === item.title)
              )
              .slice(0, 20)
              .map((item) => (
                <PostItem post={item} key={item?._id} />
              ))}
          </div>
        </div>
      </Premium>
      {user ? (
        <Acount className="my-container">
          <span>{user?.email}</span>
          <button
            className="btn text-white"
            onClick={() => dispatch(logoutUser())}
          >
            Sign out
          </button>
        </Acount>
      ) : (
        <Acount className="my-container">
          <span>Sign in to save your data</span>
          <button onClick={() => navicate("/login")} className="btn text-white">
            Sign in
          </button>
        </Acount>
      )}
    </Main>
  );
};

const Main = styled.div`
  & .carousel-item img {
    @media (max-width: 767px) {
      height: 246.66px;
    }
  }

  & .category {
    // min-width: 1300px;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    // justify-content: center;
    & .child-cate {
      width: fit-content;
      height: 210px;
    }
    & img {
      height: 161px;
      object-fit: cover;
    }
  }
  & .carousel-inner {
    @media (min-width: 668px) {
      height: 370px;
    }
    & img {
      object-fit: cover;
    }
  }
`;
const SecondHeder = styled.div`
  & .over {
    display: flex;
    align-items: center;
    color: white;
    // width: 95%;
    background-image: linear-gradient(90deg, black 17%, #737373);
    opacity: 0.8;
    padding: 2px 0 2px 5px;
    min-width: 100%;
    width: fit-content;
  }
  & a {
    color: white;
    margin-right: 20px;
  }

  overflow-x: auto;
  transform: translate(-11px, 56px);
  width: 107%;
  z-index: 99999;
  position: relative;
`;

const BoxesHolder = styled.div`
  min-width: 1300px;
  @media (max-width: 668px) {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  & .box {
    background-color: white;
    border-radius: 5px;
    padding: 15px;
    & span {
      font-size: 14px;
    }
    & img {
      width: 100%;
      height: 150px;
      object-fit: cover;
    }
  }
`;

const SecondHederSmall = styled.div`
  & .box-holder {
    display: flex;
    padding-top: 65px;
    gap: 10px;
    padding-left: 5px;
  }
  & img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 10px;
  }
  & p {
    color: black;
    text-align: center;
    font-size: 16px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;
const Premium = styled.div`
  background-color: white;
  padding-left: 10px;
  & .posts-container {
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;
const SerculItems = styled.div`
  padding-left: 20px;
  background-color: white;

  & .posts-container {
    display: flex;
    gap: 20px;

    & img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
    }

    & h5 {
      text-align: center;
      transform: translatey(-45px);
      background: white;
      padding-bottom: 20px;
      padding-top: 5px;
      /* position: absolute; */
      margin-bottom: -45px;
    }
  }
`;
const Acount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  /* width: 95%; */
  background-image: linear-gradient(90deg, black 17%, #737373);
  opacity: 0.8;
  border-radius: 6px;
  padding: 2px 0 2px 5px;
  margin-top: 20px;

  @media (min-width: 767px) {
    bottom: 10px;
  }
`;
export default Home;
