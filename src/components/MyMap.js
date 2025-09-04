import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";

// Fix Marker Icons Issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MyMap = () => {
  const [location, setLocation] = useState(null);
  const [isTracking, setIsTracking] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location", error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [isTracking]);

  useEffect(() => {
    if (location) {
      window.dispatchEvent(new Event("resize"));
    }
  }, [location]);

  const handleSaveLocation = async () => {
    try {
      const response = await fetch("/api/save-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(location),
      });

      if (!response.ok) throw new Error("Failed to save location");

      const data = await response.json();
      alert(data.success ? "تم حفظ الموقع بنجاح!" : "حدث خطأ أثناء حفظ الموقع");
    } catch (error) {
      alert("حدث خطأ أثناء الاتصال بالخادم");
      console.error(error);
    }
  };

  const toggleTracking = () => {
    setIsTracking(!isTracking);
    alert(isTracking ? "تم إيقاف تتبع الموقع" : "تم تفعيل تتبع الموقع");
  };

  if (!location) return <div>جاري تحميل الموقع...</div>;

  return (
    <Main style={{}}>
      <MapContainer center={[location.lat, location.lng]} zoom={15} style={{}}>
        <TileLayer
          className="my-map"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[location.lat, location.lng]}>
          <Popup>موقعك الحالي</Popup>
        </Marker>
        <Circle
          center={[location.lat, location.lng]}
          radius={50}
          color="blue"
        />
      </MapContainer>

      {/* <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={handleSaveLocation}
          style={{
            padding: "10px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          حفظ الموقع
        </button>
        <button
          onClick={toggleTracking}
          style={{
            padding: "10px",
            background: isTracking ? "#dc3545" : "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isTracking ? "إيقاف التتبع" : "تشغيل التتبع"}
        </button>
      </div> */}
    </Main>
  );
};
const Main = styled.div`
  & .leaflet-container {
    position: sticky;
    outline-style: none;
    width: 100%;
    height: 360px;
    /* margin: auto; */
    margin-top: 20px;
  }
`;
export default MyMap;
