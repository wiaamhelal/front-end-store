import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/apiCalls/authApiCall";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import {
  fitchAllCategories,
  getAllAdsApi,
} from "../redux/apiCalls/categoryApiCall";
import { getAllProfilesApi } from "../redux/apiCalls/profileApiCall";
import boldStar from "../img/star (1).png";
import normalStar from "../img/star.png";
import {
  getAllOrdersApi,
  getAllProuctsAdsApi,
  getMaxAllOrdersApi,
} from "../redux/apiCalls/postApiCall";
import FormatCurrency from "./FormatCurrency";
import { createNewClinetComment } from "../redux/apiCalls/commentApiCall";
import SalesLest from "./SalesLest";

const Home = () => {
  // setTimeout(() => {
  //   window.location.reload(false);
  // }, "1000");

  const { categories, productad } = useSelector((state) => state.category);
  const { profiles } = useSelector((state) => state.profile);
  const { orders, allMaxOrders, postsAd } = useSelector((state) => state.post);

  const allCaty = allMaxOrders.map((item) => item.orderDetails[0].category);
  const allOrders = allMaxOrders.map((item) => item.orderDetails[0]);

  const screenItems = allOrders.filter((item) => item.category == "Screen");
  const totalScreens = screenItems.reduce(
    (acc, product) => acc + product.price,
    0
  );

  const laptopItems = allOrders.filter((item) => item.category == "laptop");
  const totlLaptops = laptopItems.reduce(
    (acc, product) => acc + product.price,
    0
  );

  const audioItems = allOrders.filter((item) => item.category == "Audio");
  const totalAudio = audioItems.reduce(
    (acc, product) => acc + product.price,
    0
  );

  const TabletItems = allOrders.filter((item) => item.category == "Tablet");
  const totalTablets = TabletItems.reduce(
    (acc, product) => acc + product.price,
    0
  );

  const MobiletItems = allOrders.filter((item) => item.category == "Mobile");
  const totalMobiles = MobiletItems.reduce(
    (acc, product) => acc + product.price,
    0
  );

  const SmartwatchetItems = allOrders.filter(
    (item) => item.category == "Smartwatches"
  );
  const totalSmartwatches = SmartwatchetItems.reduce(
    (acc, product) => acc + product.price,
    0
  );

  let screens = allCaty.filter((item) => item == "Screen");
  screens = Math.round((screens.length / allCaty.length) * 100);

  let laptops = allCaty.filter((item) => item == "laptop");
  laptops = Math.round((laptops.length / allCaty.length) * 100);

  let Audio = allCaty.filter((item) => item == "Audio");
  Audio = Math.round((Audio.length / allCaty.length) * 100);

  let Tablets = allCaty.filter((item) => item == "Tablet");
  Tablets = Math.round((Tablets.length / allCaty.length) * 100);

  let Mobiles = allCaty.filter((item) => item == "Mobile");
  Mobiles = Math.round((Mobiles.length / allCaty.length) * 100);

  let Smartwatches = allCaty.filter((item) => item == "Smartwatches");
  Smartwatches = Math.round((Smartwatches.length / allCaty.length) * 100);

  useEffect(() => {
    dispatch(fitchAllCategories());
    dispatch(getAllProfilesApi());
    dispatch(getAllOrdersApi());
    dispatch(getMaxAllOrdersApi());
    dispatch(getAllAdsApi());
    dispatch(getAllProuctsAdsApi());
  }, []);

  const { user } = useSelector((state) => state.auth);
  const navicate = useNavigate();
  const dispatch = useDispatch();

  const adminProfile = profiles?.filter((item) => item?.isAdmin == true);
  const [comment, setcomment] = useState("");
  const sendComment = (e) => {
    e.preventDefault();
    dispatch(createNewClinetComment({ text: comment }));
    // toast.success("thank you for your opininiont");
    setcomment("");
  };

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

  return (
    <Main className="text-dark">
      <SecondHeder className="ps-2">
        <div className="over">
          {filteredItems?.map((item, index) => (
            <Link key={index} to={`/products/main/${item?.mainTitle}`}>
              {item?.mainTitle}
            </Link>
          ))}
        </div>
      </SecondHeder>
      <div
        id="carouselExampleControls"
        class="carousel slide"
        data-bs-ride="carousel"
        style={{
          transform: "translateY(53px)",
          maskImage: "linear-gradient(180deg, #000, transparent)",
        }}
      >
        <div class="carousel-inner" onClick={() => navicate("/products")}>
          <div class="carousel-item active">
            <img
              src="https://m.media-amazon.com/images/I/71C4J2fLKAL._SX3000_.jpg"
              class="d-block w-100"
              alt="..."
            />
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
      <div style={{ overflowX: "auto" }}>
        <BoxesHolder>
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

      {user ? (
        <Acount>
          <span>{user?.email}</span>
          <button
            className="btn text-white"
            onClick={() => dispatch(logoutUser())}
          >
            Sign out
          </button>
        </Acount>
      ) : (
        <Acount>
          <span>Sign in to save your data</span>
          <button onClick={() => navicate("/login")} className="btn text-white">
            Sign in
          </button>
        </Acount>
      )}
      <div className="shadow-line-start"></div>
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
      <div
        className="shadow-line-end"
        style={{ transform: "translateY(292px)" }}
      ></div>
      <div class="team">
        <h2 class="main-title" style={{ transform: "translatey(350px)" }}>
          Admins
        </h2>
        <div class="container">
          {adminProfile?.map((item) => (
            <Link className="text-dark" to={`/profile/${item._id}`}>
              <div class="box">
                <div class="image">
                  <img
                    className="pro-img"
                    src={item?.profilePhoto?.url}
                    alt=""
                  />
                </div>
                <ul>
                  {Array(
                    Math.round(
                      (item?.likes?.length /
                        (item?.dislikes?.length + item?.likes?.length)) *
                        5
                    ) || 0
                  )
                    .fill()
                    .map((_, i) => (
                      <li>
                        <img src={boldStar} alt="" />
                      </li>
                    ))}
                </ul>
                <h3>{item?.username}</h3>
                <span>{item?.email}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div class="testi" id="testi">
        <h2 class="main-title" style={{ transform: "translatey(-10px)" }}>
          Team Members
        </h2>
        <div class="container">
          {profiles?.map((item, index) => (
            <>
              {index < 6 && (
                <Link className="text-dark" to={`/profile/${item._id}`}>
                  <div class="box">
                    <img
                      className="my-img"
                      src={item?.profilePhoto?.url}
                      alt=""
                    />
                    <h3>{item?.username}</h3>
                    <span>{item?.email}</span>
                    <ul>
                      {Array(
                        Math.round(
                          (item?.likes?.length /
                            (item?.dislikes?.length + item?.likes?.length)) *
                            5
                        ) || 0
                      )
                        .fill()
                        .map((_, i) => (
                          <li>
                            <img src={boldStar} alt="" />
                          </li>
                        ))}
                    </ul>
                    <p>
                      ! Vel dolores maxime incidunt quos quidem odit.
                      Voluptatibus non quisquam tempore vel eum! Excepturi ex
                      sit nulla quam voluptate?
                    </p>
                  </div>
                </Link>
              )}
            </>
          ))}
        </div>
        <div className="text-center mt-3 text-dark">
          {" "}
          <button
            className="wiaam-btn btn"
            onClick={() => navicate("/all-users")}
          >
            see all users
          </button>
        </div>
      </div>
      {/* start fearures */}
      <div
        class="featurs text-dark"
        id="featurs"
        style={{ transform: "translate(-10px,550px)" }}
      >
        <h2 class="main-title">featurs</h2>
        <div class="container">
          <div class="box one">
            <div class="image">
              <img
                src="https://pix4free.org/assets/library/2021-06-16/originals/owner.jpg"
                alt=""
              />
            </div>
            <h3>Owner</h3>
            <p>
              after 2 years as an admin you can invest your own cash and you
              will get benefits depend on your saling sistem{" "}
            </p>
            <a href="/contactus">more</a>
          </div>
          <div class="box tow">
            <div class="image">
              <img
                src="https://images.squarespace-cdn.com/content/v1/594da388e6f2e154771b71ad/1623869846436-PQ81Y1R9CY6A29F116WP/man-holding-admin-card.jpg"
                alt=""
              />
            </div>
            <h3>Admin</h3>
            <p>
              sold over than 100 product and invited 20 user you can requist to
              be an admin , but your activity it should still the same you will
              be removed{" "}
            </p>
            <a href="/contactus">more</a>
          </div>
          <div class="box three">
            <div class="image">
              <img
                src="https://www.shutterstock.com/shutterstock/photos/231469315/display_1500/stock-photo-word-user-of-the-yellow-square-pixels-on-a-black-matrix-background-registration-concept-231469315.jpg"
                alt=""
              />
            </div>
            <h3>User</h3>
            <p>
              just signin and start post protucts, as a user your authority it
              will be jut seling products if the activity stop the user will be
              removed{" "}
            </p>
            <a href="/contactus">more</a>
          </div>
        </div>
      </div>
      {/* end fearures */}

      <div
        className="shadow-line-start"
        style={{ transform: "translateY(684px)" }}
      ></div>
      <div className="progres-holder">
        <div className="container">
          <h2 class="main-title">our sales</h2>
          <img
            src="https://media.licdn.com/dms/image/v2/D5612AQGXYr8XH3IPfQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1701797640305?e=2147483647&v=beta&t=elMXeTA21QTM3RwkmQvnOHcHHzZEWIeVH0Px7NHyK6s"
            alt=""
          />

          <SalesLest />
        </div>
      </div>
      <div
        className="shadow-line-end"
        style={{ transform: "translateY(588px)" }}
      ></div>
      <MessageUs className="mt-5 row container pb-4">
        <FirstPart className=" col-12 col-sm-6">
          <h1 className="mb-3 fw-bold text-center text-sm-start">Message Us</h1>
          <p style={{ lineHeight: "1.7" }}>
            If you wish to be considered for employment at Weifield, please do
            not send a message, here – instead, please complete Weifield’s job
            application and our Human Resources department will contact you
            after their review of your submitted information.
          </p>
        </FirstPart>
        <SecondPart className="col-12 col-sm-6">
          <form>
            <div className="d-flex align-items-center justify-content-between">
              <h6 className="fw-bold">Name</h6>{" "}
              {!user && (
                <div className="d-flex align-items-center">
                  <Link
                    to="/login"
                    style={{ fontSize: "12px" }}
                    className="btn btn-sm btn-primary rounded-pill mb-1"
                  >
                    Sign in
                  </Link>
                  <h6 className="fw-bold text-danger ms-2">
                    You have to sign in first
                  </h6>
                </div>
              )}
            </div>
            <input
              disabled={!user}
              type="text"
              value={user?.username}
              className="my-feild"
            />
            <h6 className="fw-bold mt-3">Email</h6>
            <input
              type="email"
              disabled={!user}
              className="my-feild"
              value={user?.email}
            />
            <h6 className="fw-bold mt-3">comments</h6>
            <textarea
              value={comment}
              onChange={(e) => setcomment(e.target.value)}
              disabled={!user}
              className="my-feild"
            />
            <button
              onClick={sendComment}
              disabled={!user || !comment}
              className="d-block btn btn-secondary mt-3 w-100"
            >
              Submit
            </button>
          </form>
        </SecondPart>
      </MessageUs>
    </Main>
  );
};

const Main = styled.div`
  // transform: translatey(-38px);
  & .free-del-img {
    max-width: 100%;
    // opacity: 0.8;
    transform: translateY(53px);
    mask-image: linear-gradient(180deg, #000, transparent);

    & div {
      content: "";
      background: linear-gradient(to top, #f8f9fa00 0%, #5ac5be 100%);
      height: 72px;
      transform: translateY(53px);
      opacity: 0.8;
    }
  }
  overflow-x: hidden;
  & .card-img-top {
    height: 161px;
  }
  & .card-text {
    font-weight: bold;
  }
  & .shadow-line-start {
    height: 72px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    );
    margin-bottom: -36px;
    z-index: 11111;
    position: relative;
    transform: translateY(397px);
    width: 107%;
    left: -10px;
  }
  & .shadow-line-end {
    height: 72px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 100%
    );
    margin-bottom: -36px;
    z-index: 11111;
    position: relative;
    transform: translateY(397px);
    width: 107%;
    left: -10px;
  }

  & .carousel-item img {
    @media (max-width: 767px) {
      height: 246.66px;
    }
  }
  // padding: 0 10px;
  background-image: url("https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=600");
  height: 110vh;
  @media (min-width: 767px) {
    background-image: url("https://images.pexels.com/photos/1006107/pexels-photo-1006107.jpeg");
    background-size: cover;
  }
  & .welcome-line {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    line-height: 2;
    color: white;
    padding-top: 200px;
    @media (min-width: 767px) {
      font-size: 28px;
    }
  }
  & .the-btn {
    background-image: linear-gradient(90deg, black 17%, #737373);
    border: none;
    color: white;
    opacity: 0.8;
  }

  & .category {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translatey(362px);
    background-size: contain;
    background-image: url(https://plus.unsplash.com/premium_photo-1673766647702-9e5961440e60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
    min-height: 100vh;
    padding-top: 50px;
    & .child-cate {
      width: fit-content;
      height: 210px;
    }
  }
  & .progres-holder {
    margin: 0 -11px;
    padding: 50px 0px;
    background-size: contain;
    background-image: url(https://images.pexels.com/photos/172294/pexels-photo-172294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
    // min-height: 100vh;
    color: var(--blue-color);
    transform: translateY(650px);
    & .percent {
      font-size: 13px;
      color: #2196f3;
      border: 1px solid #2196f3;
      border-radius: 4px;
      padding: 1px 2px;
      font-weight: bold;
    }
    & img {
      max-width: 100%;
      border-radius: 10px;
      opacity: 0.8;
      margin-bottom: 20px;
    }
    & h5 {
      font-weight: bold;
    }
  }
  & .progress {
    background: #0d6efd52;
  }

  & .our-sales {
    background-size: contain;
    background-image: url(https://plus.unsplash.com/premium_photo-1673766647702-9e5961440e60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
    // min-height: 100vh;
    padding-top: 50px;
  }
`;
const Acount = styled.div`
  transform: translate(10px, 343px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  width: 95%;
  background-image: linear-gradient(90deg, black 17%, #737373);
  opacity: 0.8;
  border-radius: 6px;
  padding: 2px 0 2px 5px;
  @media (min-width: 767px) {
    bottom: 10px;
  }
  // & .skills {
  //   transform: translatey(630px);
  //   flex: 1;
  //   & h3 {
  //     justify-content: space-between;
  //     display: flex;
  //     align-items: center;
  //     & .progres {
  //       background-color: #d5d5d5;
  //       height: 25px;
  //       position: relative;
  //       & span {
  //         position: absolute;
  //         background-color: blue;
  //         height: 100%;
  //       }
  //     }
  //   }
  // }
`;
const SecondHeder = styled.div`
  & .over {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    color: white;
    // width: 95%;
    background-image: linear-gradient(90deg, black 17%, #737373);
    opacity: 0.8;
    // border-radius: 6px;
    padding: 2px 0 2px 5px;
    min-width: 100%;
    width: fit-content;
  }
  & a {
    color: white;
    margin-right: 20px;
  }

  overflow-x: auto;
  transform: translate(-11px, 54px);
  width: 107%;

  // width: 1278px;
`;
const MessageUs = styled.div`
  position: relative;
  transform: translatey(663px);
  color: white;
  margin: auto;
`;
const FirstPart = styled.div``;
const SecondPart = styled.div`
  & .my-feild {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #eee;
    outline: none;
    padding: 5px;
  }
  & textarea {
    resize: none;
    min-height: 150px;
  }
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
    }
  }
`;
export default Home;
