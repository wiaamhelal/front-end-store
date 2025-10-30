// import React, { useEffect, useState } from "react";
// import PostItem from "./PostItem";
// import Paganation from "./Paganation";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchMaxPosts,
//   fetchPosts,
//   getAllProuctsAds24hoursApi,
//   getPostsCount,
// } from "../redux/apiCalls/postApiCall";
// import { SideBar } from "./SideBar";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// const TodayDeals = () => {
//   const { adsFor24Hours } = useSelector((state) => state.post);
//   const dispatch = useDispatch();
//   const POST_PER_PAGE = 8;
//   const [currentPage, setcurrentPage] = useState(1);
//   const pages = Math.ceil(adsFor24Hours?.length / POST_PER_PAGE);

//   useEffect(() => {
//     dispatch(getAllProuctsAds24hoursApi());
//   }, []);

//   return (
//     <Holder>
//       <div className="container">
//         <SideBar />
//         <div className="row gap-3 justify-content-center d-flex">
//           {adsFor24Hours.map((item) => (
//             <PostItem post={item?.order} key={item?.order?._id} />
//           ))}
//         </div>

//         <div className="col-12 mt-3">
//           <Paganation
//             currentPage={currentPage}
//             setcurrentPage={setcurrentPage}
//             pages={pages}
//           />
//         </div>
//       </div>
//     </Holder>
//   );
// };

// const Holder = styled.div`
//   padding-top: 70px;
// `;

// export default TodayDeals;

import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Paganation from "./Paganation";
import { useDispatch, useSelector } from "react-redux";
import { getAllProuctsAds24hoursApi } from "../redux/apiCalls/postApiCall";
import { SideBar } from "./SideBar";
import styled from "styled-components";

const TodayDeals = () => {
  const { adsFor24Hours } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const POST_PER_PAGE = 8;
  const [currentPage, setcurrentPage] = useState(1);

  // حساب عدد الصفحات
  const pages = Math.ceil(adsFor24Hours?.length / POST_PER_PAGE);

  // تحديد أول وآخر index في الصفحة الحالية
  const startIndex = (currentPage - 1) * POST_PER_PAGE;
  const endIndex = startIndex + POST_PER_PAGE;

  // قصّ النتائج بناءً على الصفحة
  const displayedPosts = adsFor24Hours?.slice(startIndex, endIndex);

  useEffect(() => {
    dispatch(getAllProuctsAds24hoursApi());
  }, [dispatch]);

  return (
    <Holder>
      <div className="container">
        {/* <SideBar /> */}
        <div className="row gap-3 justify-content-center d-flex">
          {displayedPosts?.length > 0 ? (
            displayedPosts.map((item) => (
              <PostItem post={item?.order} key={item?.order?._id} />
            ))
          ) : (
            <h1 className="text-center mt-4">No Deals For Today</h1>
          )}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="col-12 mt-3">
            <Paganation
              currentPage={currentPage}
              setcurrentPage={setcurrentPage}
              pages={pages}
            />
          </div>
        )}
      </div>
    </Holder>
  );
};

const Holder = styled.div`
  padding-top: 70px;
`;

export default TodayDeals;
