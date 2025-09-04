import React from "react";
import { useSelector } from "react-redux";
import boldStar from "../img/star (1).png";
import { Link } from "react-router-dom";

const AllUsers = () => {
  const { profiles } = useSelector((state) => state.profile);
  return (
    <div>
      <div class="testi" id="testi" style={{ transform: "translatey(87px)" }}>
        <div class="container">
          {profiles?.map((item) => (
            <Link className="text-dark" to={`/profile/${item._id}`}>
              <div class="box">
                <img className="my-img" src={item?.profilePhoto?.url} alt="" />
                <h3>{item?.username}</h3>
                <span>{item?.email}</span>
                <ul>
                  <li>
                    <img src={boldStar} alt="" />
                  </li>
                  <li>
                    <img src={boldStar} alt="" />
                  </li>
                  <li>
                    <img src={boldStar} alt="" />
                  </li>
                  <li>
                    <img src={boldStar} alt="" />
                  </li>
                  <li>
                    <img
                      src="https://www.iconpacks.net/icons/1/free-star-icon-984-thumb.png"
                      alt=""
                    />
                  </li>
                </ul>
                <p>
                  ! Vel dolores maxime incidunt quos quidem odit. Voluptatibus
                  non quisquam tempore vel eum! Excepturi ex sit nulla quam
                  voluptate?
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
