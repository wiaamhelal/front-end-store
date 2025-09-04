import React from "react";
import SidebarDashboard from "./SidebarDashboard";
import MainDashboard from "./MainDashboard";
import styled from "styled-components";

const Dashboard = () => {
  return (
    <Holder className=" m-4 m-md-0">
      <div className="row">
        <div className="sidebar col-2 d-none d-md-block ">
          <SidebarDashboard />
        </div>
        <div className="main col-12 col-md-10">
          <MainDashboard />
        </div>
      </div>
    </Holder>
  );
};
const Holder = styled.div`
  padding-top: 80px;
`;
export default Dashboard;
