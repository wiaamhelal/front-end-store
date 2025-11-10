import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fitchAllCategories } from "../redux/apiCalls/categoryApiCall";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getAllProuctsAdsApi } from "../redux/apiCalls/postApiCall";

const BranchProducts = () => {
  const { categories } = useSelector((state) => state.category);
  const { postsAd } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navicate = useNavigate();
  useEffect(() => {
    dispatch(fitchAllCategories());
    dispatch(getAllProuctsAdsApi());
  }, []);

  const { mainTitle } = useParams();
  const filterdcate = categories.filter((item) => item.mainTitle === mainTitle);
  const theRightAd = postsAd.filter(
    (item) => item?.order?.mainCategory === filterdcate[0]?.mainTitle
  );

  return (
    <Holder>
      <BoxesHolder className="">
        {theRightAd?.map((item) => (
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
      <div className="top-shadow">
        <Main className=" container">
          {filterdcate?.map((item) => (
            <Link
              className="child-cate"
              to={`/products/branch/${item?.branchTitle}`}
            >
              <div class="card">
                <img
                  src={
                    item?.images[1]
                      ? item?.images[1]?.url
                      : item?.images[0]?.url
                  }
                  class="card-img-top"
                  alt="..."
                />
                <div class="card-body">
                  <h4 class="card-text">{item?.branchTitle}</h4>
                </div>
              </div>
            </Link>
          ))}
        </Main>
      </div>
    </Holder>
  );
};

const Holder = styled.div`
  & .top-shadow {
    // box-shadow: 0px -20px 20px 8px rgba(0, 0, 0, 0.25);
    margin-top: 40px;
  }
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 5px;
  padding-top: 20px;
  width: 100%;
  margin: auto;
  gap: 10px;
  & img {
    height: 161px;
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
      // object-fit: cover;
    }
  }
`;
export default BranchProducts;
// col-12 col-sm-6 col-md-4 col-lg-3 mb-4
