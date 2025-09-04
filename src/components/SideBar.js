import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fitchAllCategories } from "../redux/apiCalls/categoryApiCall";
import styled from "styled-components";
export const SideBar = () => {
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fitchAllCategories());
  });
  return (
    <Main>
      <li className="nav-item dropdown btn btn-success">
        <Link
          className="nav-link dropdown-toggle"
          to="#"
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          categories
        </Link>
        <ul
          className="dropdown-menu my-drop"
          aria-labelledby="navbarDropdown"
          style={{ inset: "10px auto auto -125px" }}
        >
          <li>
            <Link class="dropdown-item" to={`/products`}>
              All
            </Link>
          </li>
          {categories?.map((item) => (
            <li>
              <Link class="dropdown-item" to={`/posts/category/${item?.title}`}>
                {item?.title}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </Main>
  );
};

const Main = styled.div`
  & .my-drop {
    inset: 10px auto auto -36px !important;
  }
  position: absolute;
  right: 8%;
  top: 80px;
  z-index: 100;
`;
