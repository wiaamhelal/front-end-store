import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fitchAllCategories } from "../redux/apiCalls/categoryApiCall";
import {
  fetchMaxPosts,
  getMaxAllOrdersApi,
} from "../redux/apiCalls/postApiCall";
import PostItem from "./PostItem";
import { Link } from "react-router-dom";

const BestSales = () => {
  const { categories } = useSelector((state) => state.category);
  const { orders, allMaxOrders, maxPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fitchAllCategories());
    dispatch(getMaxAllOrdersApi());
    dispatch(fetchMaxPosts());
  }, []);

  const handleItem = (item) => {
    const chosenItem = allMaxOrders?.filter(
      (order) => order?.orderDetails[0]?.category === item
    );

    return { chosenItem };
  };
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <Main>
      <div className="d-flex align-items-center justify-content-between">
        <h2 className="ms-2 fw-bold">Best Sales</h2>
        <span className="nav-item dropdown d-sm-none">
          <Link
            className="nav-link dropdown-toggle fs-4 fw-bold m-0 p-0"
            to="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            sections
          </Link>
          <ul className="dropdown-menu p-2" aria-labelledby="navbarDropdown">
            {/* <li className="mb-1" onClick={() => setSelectedCategory(null)}>
              Any Department
            </li>
            {categories?.map((item) => (
              <li
                className="mb-1"
                onClick={() => setSelectedCategory(item?.branchTitle)}
              >
                {item?.branchTitle}
              </li>
            ))} */}
            <p
              style={{ cursor: "pointer" }}
              className="mb-1"
              onClick={() => setSelectedCategory(null)}
            >
              Any Department
            </p>
            {categories?.map((staff) => {
              // فلترة المنتجات الخاصة بكل تصنيف
              const myItems = maxPosts.filter(
                (item) => item?.category === staff?.branchTitle
              );
              if (myItems.length === 0) return null; // this is in case the category is empty
              // ترتيب واختيار أفضل 5 لهذا التصنيف فقط
              return (
                <p
                  style={{ cursor: "pointer" }}
                  className="mb-1"
                  onClick={() => setSelectedCategory(staff?.branchTitle)}
                >
                  {staff?.branchTitle}
                </p>
              );
            })}
          </ul>
        </span>
      </div>
      <p className="ms-2 fw-bold">
        Our most popular products based on sales. Updated frequently.
      </p>
      <div className="d-flex">
        <Header className="ms-2 d-none d-sm-block">
          <p
            style={{ cursor: "pointer" }}
            className="mb-1"
            onClick={() => setSelectedCategory(null)}
          >
            Any Department
          </p>
          {categories?.map((staff) => {
            // فلترة المنتجات الخاصة بكل تصنيف
            const myItems = maxPosts.filter(
              (item) => item?.category === staff?.branchTitle
            );
            if (myItems.length === 0) return null; // this is in case the category is empty
            // ترتيب واختيار أفضل 5 لهذا التصنيف فقط
            return (
              <p
                style={{ cursor: "pointer" }}
                className="mb-1"
                onClick={() => setSelectedCategory(staff?.branchTitle)}
              >
                {staff?.branchTitle}
              </p>
            );
          })}
        </Header>
        <Body style={{ overflowX: "auto" }}>
          {categories
            ?.filter((staff) =>
              selectedCategory ? staff?.branchTitle === selectedCategory : true
            )
            .map((staff) => {
              // فلترة المنتجات الخاصة بكل تصنيف
              const myItems = maxPosts.filter(
                (item) => item?.category === staff?.branchTitle
              );
              if (myItems.length === 0) return null; // this is in case the category is empty
              // ترتيب واختيار أفضل 5 لهذا التصنيف فقط
              const bestProducts = myItems
                .sort((a, b) => b.sales - a.sales) // ترتيب تنازلي حسب المبيعات
                .slice(0, 20); // خذ أول 5 فقط

              return (
                <div key={staff?.branchTitle}>
                  <h3>Best Sellers in {staff?.branchTitle}</h3>
                  <div>
                    <div className="box">
                      {bestProducts
                        .filter(
                          (item, index, self) =>
                            index ===
                            self.findIndex((obj) => obj.title === item.title)
                        )
                        ?.map((item, i) => (
                          <div key={item?.id || i}>
                            <span className="m-0 p-0 numbers">#{i + 1}</span>
                            <PostItem post={item} />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </Body>
      </div>
    </Main>
  );
};

const Main = styled.div`
  padding-top: 80px;
`;
const Header = styled.div`
  border-right: 3px solid #ccc;
  margin-right: 10px;
  padding-right: 10px;
`;
const Body = styled.div`
  & .box {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    gap: 15px;
    margin-bottom: 20px;
    & .numbers {
      background: #575757;
      color: white;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: translateY(15px);
    }
  }
`;

export default BestSales;
