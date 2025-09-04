import React from "react";
import { Link, useNavigate } from "react-router-dom";
const SidebarDashboard = () => {
  const navicate = useNavigate();
  return (
    <div className="">
      <h2
        className="mb-3"
        onClick={() => navicate("/dashboard")}
        style={{ cursor: "pointer" }}
      >
        Dashboard
      </h2>
      <ul className="text-secondary ms-2 fw-bold">
        <li className="nav-item">
          <Link to="/dashboard/user-table" className="mb-3 nav-link">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/posts-tabe" className="mb-3 nav-link">
            Products
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/categories-tabe" className="mb-3 nav-link">
            Categories
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/comment-table" className="mb-3 nav-link">
            Product comments
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/dashboard/retun-order" className="mb-3 nav-link">
            retun requests
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/create-post" className="mb-3 nav-link">
            Create Product
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/messages" className="mb-3 nav-link">
            Client Messages
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarDashboard;
