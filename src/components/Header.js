import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/apiCalls/authApiCall";
import { styled } from "styled-components";
import cardIcon from "../img/shopping-card-svgrepo-com (1).svg";
import { postActions } from "../redux/slices/postSlice";
import LanguageSwitcher from "./LanguageSwitcher";
import TranslateWidget from "./TranslateWedgit";
const Headerr = () => {
  const { user } = useSelector((state) => state.auth);
  const { basket, searsh } = useSelector((state) => state.post);
  const { profile } = useSelector((state) => state.profile);
  // const [isOpen, setisOpen] = useState(true);
  const dispatch = useDispatch();
  const navicate = useNavigate();
  // const toggerNavbar = () => {
  //   setisOpen(!isOpen);
  // };
  // const coseNavbar = () => {
  //   setisOpen(false);
  // };
  const closeMenu = () => {
    const menu = document.getElementById("navbarSupportedContent");
    menu.classList.remove("show");
  };
  return (
    <Main className="">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark my-nav ">
        <div className="container-fluid  justify-content-end">
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              {user ? (
                <Link to={`/profile/${user._id}`}>
                  <img
                    src={user?.profilePhoto?.url}
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                    className="rounded-circle me-2"
                  />
                  {/* <span>{user?.username}</span> */}
                </Link>
              ) : (
                <Link to="/sign in">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                    alt=""
                    style={{ width: "40px", height: "40px" }}
                    className="rounded-circle me-2"
                  />
                </Link>
              )}
              <li className="nav-item">
                <Link
                  onClick={closeMenu}
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {user?.isAdmin && (
                <li className="nav-item">
                  <Link
                    onClick={closeMenu}
                    className="nav-link"
                    to="/dashboard"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Admin Dashboard
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link
                  onClick={closeMenu}
                  className="nav-link"
                  to="/our-comunity"
                >
                  Our Community
                </Link>
              </li>
              <li className="nav-item">
                <Link onClick={closeMenu} className="nav-link" to="/best-sales">
                  Best Sales
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={closeMenu}
                  className="nav-link"
                  to="/today-deals"
                >
                  Today's Deals
                </Link>
              </li>
              <li className="nav-item">
                <Link onClick={closeMenu} className="nav-link" to="/products2">
                  Brouse
                </Link>
              </li>
              {!user && (
                <li className="nav-item dropdown">
                  <Link
                    onClick={closeMenu}
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sign in
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        onClick={closeMenu}
                        className="dropdown-item"
                        to="/login"
                      >
                        Log in
                      </Link>
                    </li>
                    <li>
                      <Link
                        onClick={closeMenu}
                        className="dropdown-item"
                        to="/register"
                      >
                        register
                      </Link>
                    </li>
                  </ul>
                </li>
              )}
              {/* {user && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/create-post"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Create product
                  </Link>
                </li>
              )} */}

              {/* {user?.isAdmin && (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/closing-page"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Closing Page
                  </Link>
                </li>
              )} */}
              <li className="nav-item">
                <Link
                  onClick={closeMenu}
                  className="nav-link"
                  to="/about"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={closeMenu}
                  className="nav-link"
                  to="/contactus"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={closeMenu}
                  className="nav-link"
                  to="/settings"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Settings
                </Link>
              </li>
              {profile?.orders && (
                <li className="nav-item">
                  <Link
                    onClick={closeMenu}
                    className="nav-link"
                    to="/orders"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Your Order
                  </Link>
                </li>
              )}
              {/* <li className="nav-item dropdown">
                <Link
                  onClick={closeMenu}
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Language
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <LanguageSwitcher />
                    <TranslateWidget />
                  </li>
                </ul>
              </li> */}
              <li className="nav-item">
                <Link
                  onClick={closeMenu}
                  className="nav-link"
                  to="/location"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  {profile?.location
                    ? profile?.location?.city +
                      ", " +
                      profile?.location?.arya.substring(0, 7) +
                      ".."
                    : "Delever To"}
                </Link>
              </li>
              {/* <li>
                <LanguageSwitcher />
                <TranslateWidget />
              </li> */}
              <Basket
                className="mb-2 mb-md-0"
                onClick={() => {
                  navicate("/basket");
                  closeMenu();
                }}
              >
                <img src={cardIcon} alt="" />
                {basket.length ? <span>{basket?.length}</span> : null}
              </Basket>
            </ul>
            <form className="d-flex" onSubmit={() => navicate("/products")}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                // aria-label="Search"
                onChange={(e) =>
                  dispatch(postActions.setSearch(e.target.value))
                }
                value={searsh}
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </Main>
  );
};
const Main = styled.div`
  & .my-nav {
    position: fixed;
    width: 100%;
    z-index: 99999;
    top: 0;
    opacity: 0.9;
  }
`;
const Basket = styled.div`
  position: relative;
  width: fit-content;
  cursor: pointer;
  & span {
    position: absolute;
    bottom: -3px;
    right: -4px;
    color: white;
    background-color: red;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & img {
    width: 30px;
    margin-left: 5px;
    margin-top: 5px;
  }
`;
export default Headerr;
