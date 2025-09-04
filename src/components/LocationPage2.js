import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  setUserLocationApi,
} from "../redux/apiCalls/profileApiCall";
import axios from "axios";
import MyMap from "./MyMap";

const LocationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);
  const { basket } = useSelector((state) => state.post);
  const [number, setnumber] = useState("");
  const [country, setcountry] = useState();
  const [city, setcity] = useState();
  const [arya, setarya] = useState("");
  const [street, setstreet] = useState("");
  const [building, setbuilding] = useState();

  const getAddressFromCoordinates = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const { address } = response.data;

      // هنا نقوم بملء الحقول باستخدام البيانات المتاحة
      setcountry(address?.country);
      setcity(address?.state);
      setarya(address.residential || address.neighbourhood || ""); // نحدد المنطقة أو المدينة
      setstreet(address.road || ""); // نحدد الشارع
      setbuilding(address.house_number || address.suburb || "");
      // إذا لم يوجد رقم المنزل، نستخدم suburb أو residential كبديل
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // الحصول على الموقع الجغرافي عند تحميل الصفحة
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getAddressFromCoordinates(latitude, longitude); // تعبئة الحقول تلقائيًا
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // دالة لإرسال بيانات الموقع
  const LocationInfo = (e) => {
    e.preventDefault();
    dispatch(
      setUserLocationApi(user._id, {
        phone: number,
        country: country,
        city: city,
        arya: arya,
        street: street,
        building: building,
      })
    );
    setnumber("");
    setarya("");
    setstreet("");
    setbuilding("");
  };

  useEffect(() => {
    dispatch(getUserProfile(user._id));
  }, [profile]);

  return (
    <Holder>
      <Main className="container">
        <MyMap />
        <div className="row mt-2">
          <div className="col-12 col-sm-6">
            <h5 className="fw-bold text-secondary mt-2 mt-sm-0">Country</h5>
            <input
              type="text"
              className="my-feild"
              value={country}
              onChange={(e) => setcountry(e.target.value)}
            />
            <h5 className="fw-bold text-secondary mt-2 mt-sm-0">city</h5>
            <input
              type="text"
              className="my-feild"
              value={city}
              onChange={(e) => setcity(e.target.value)}
            />
            <h5 className="fw-bold text-secondary mt-2 mt-sm-0">Arya</h5>
            <input
              type="text"
              className="my-feild"
              value={arya}
              onChange={(e) => setarya(e.target.value)}
            />
            <h5 className="fw-bold text-secondary mt-2">Street</h5>
            <input
              type="text"
              className="my-feild"
              value={street}
              onChange={(e) => setstreet(e.target.value)}
            />
            <h5 className="fw-bold text-secondary mt-2">Building</h5>
            <input
              type="text"
              className="my-feild"
              value={building}
              onChange={(e) => setbuilding(e.target.value)}
            />
          </div>
          <div className="col-12 col-sm-6">
            <h5 className="fw-bold text-secondary">Name</h5>
            <input
              type="text"
              className="my-feild"
              value={user?.username}
              readOnly
            />
            <h5 className="fw-bold text-secondary mt-2">Email</h5>
            <input
              type="email"
              className="my-feild"
              value={profile?.email}
              readOnly
            />
            <h5 className="fw-bold text-secondary mt-2">Phone Number</h5>
            <input
              type="number"
              className="my-feild"
              value={number}
              onChange={(e) => setnumber(e.target.value)}
              placeholder="05..."
            />
            <button
              className="btn btn-success w-100 mt-4"
              disabled={!number || !arya || !street || !building}
              onClick={LocationInfo}
            >
              Submit
            </button>
            <div className="location-info shadow  ">
              <h3 className="fw-bold">Location Info</h3>
              <div>
                <span className="fw-bold">Name: </span>
                <span className="fw-bold text-secondary mt-2">
                  {user?.username}
                </span>
              </div>
              <div className="mt-2">
                <span className="fw-bold">Phone Number: </span>
                <span className="fw-bold text-secondary mt-2">
                  {profile?.location?.phone}
                </span>
              </div>
              <div className="mt-2">
                <span className="fw-bold">Country: </span>
                <span className="fw-bold text-secondary mt-2">
                  {profile?.location?.country}
                </span>
              </div>
              <div className="mt-2">
                <span className="fw-bold">City: </span>
                <span className="fw-bold text-secondary mt-2">
                  {profile?.location?.city}
                </span>
              </div>
              <div className="mt-2">
                <span className="fw-bold">Arya: </span>
                <span className="fw-bold text-secondary mt-2">
                  {profile?.location?.arya}
                </span>
              </div>
              <div className="mt-2">
                <span className="fw-bold">Street: </span>
                <span className="fw-bold mt-2 text-secondary">
                  {profile?.location?.street}
                </span>
              </div>
              <div className="mt-2">
                <span className="fw-bold">Building: </span>
                <span className="fw-bold text-secondary mt-2">
                  {profile?.location?.building}
                </span>
              </div>
            </div>
          </div>
        </div>
        {basket.length != 0 && (
          <button
            className="btn btn-success w-100 mt-4 mt-sm-5"
            onClick={() => navigate("/payment")}
            disabled={
              !profile?.location?.phone ||
              !profile?.location?.building ||
              !profile?.location?.arya ||
              !profile?.location?.street
            }
          >
            Continue to payment
          </button>
        )}
      </Main>
    </Holder>
  );
};

const Holder = styled.div`
  overflow: hidden;
  padding-top: 80px;
  background-image: url("https://images.unsplash.com/photo-1615799998603-7c6270a45196?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-size: contain;
  min-height: 100vh;
`;

const Main = styled.div`
  & .my-feild {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #eee;
    outline: none;
    padding: 5px;
  }
  & .location-info {
    background-color: #eee;
    padding: 15px;
    border-radius: 10px;
    width: 100%;
    margin-top: 38px;
  }
`;

export default LocationPage;
