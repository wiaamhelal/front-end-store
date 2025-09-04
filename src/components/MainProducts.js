import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fitchAllCategories } from "../redux/apiCalls/categoryApiCall";
import styled from "styled-components";

const Products2 = () => {
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fitchAllCategories());
  }, []);

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
    <Main className="container">
      {filteredItems?.map((item) => (
        <Link
          className="child-cate"
          style={{ minWidth: "18rem" }}
          to={`/products/main/${item?.mainTitle}`}
        >
          <div class="card">
            <img src={item?.images[0]?.url} class="card-img-top" alt="..." />
            <div class="card-body">
              <h4 class="card-text">{item?.mainTitle}</h4>
            </div>
          </div>
        </Link>
      ))}
    </Main>
  );
};
const Main = styled.div`
  // display: grid;
  // grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  // gap: 5px;
  // margin-right: 10px;
  // margin-left: 10px;
  // padding-top: 100px;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 5px;
  margin-right: 10px;
  margin-left: 10px;
  padding-top: 100px;
  width: 100%;
  margin: auto;
  gap: 10px;

  & img {
    height: 161px;
  }
`;
export default Products2;
// col-12 col-sm-6 col-md-4 col-lg-3 mb-4
