import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAllClosingOrdersApi } from "../redux/apiCalls/postApiCall";
import ClosingDetails from "./ClosingDetails";
import ClosingItem from "./ClosingItem";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import FormatCurrency from "./FormatCurrency";

const ClosingPage = () => {
  const dispatch = useDispatch();
  const navicate = useNavigate();
  const [closings, setClosings] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const { ClosingOrders } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllClosingOrdersApi());
  }, []);

  return (
    <Main className=" mt-5 pt-5">
      <div class="services" id="services">
        <div class="container">
          {ClosingOrders.map((closing, index) => (
            <div
              class="box"
              onClick={() => setExpanded(expanded === index ? null : index)}
            >
              <i class="fa-solid fa-house">
                {new Date(closing.date).toLocaleDateString()}
              </i>
              {/* <h3>{new Date(closing.date).toLocaleDateString()}</h3> */}
              <div className="info d-flex align-items-center justify-content-between">
                <span className="first-span">cash</span>
                <span className="second-span">
                  {FormatCurrency(closing.totalCash)}
                </span>
              </div>
              <div className="info d-flex align-items-center justify-content-between">
                <span className="first-span">visa</span>
                <span className="second-span">
                  {FormatCurrency(closing.totalVisa)}
                </span>
              </div>
              <div className="info d-flex align-items-center justify-content-between">
                <span className="first-span">credit</span>
                <span className="second-span">
                  {FormatCurrency(closing.totalCredit)}
                </span>
              </div>
              {expanded === index &&
                navicate(`/closing-item/${closing._id}`, { state: closing })}
            </div>
          ))}
        </div>
      </div>
    </Main>
  );
};
const Main = styled.div`
  & .holder {
    & .closing-box {
      & .info {
        ::before {
          left: 84px !important;
        }
        ::after {
        }
        .second-span {
        }
      }
    }
  }
`;
export default ClosingPage;
