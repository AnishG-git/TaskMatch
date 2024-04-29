import React from "react";
import "./Settings.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function SettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = location.state || {};
  const token = userInfo.token;
  const [user, setUser] = useState(userInfo.user);

  async function go2Home() {
    // update userInfo with modified userInfo
    const reponse = await fetch("/api/get-info", {
      method: "GET",
      headers: {
        Authorization: "Token " + token,
      },
    });
    const result = await reponse.json();
    if (result.error) {
      alert(result.error);
      return;
    }
    navigate("/calendar", { state: { userInfo: result } });
  }

  const updateProfile = async () => {
    if (user.phone_number.length !== 10 || isNaN(user.phone_number)) {
      alert("Phone number must be 10 digits, no dashes or extensions.");
      return;
    }
    if (user.zip_code.length !== 5 || isNaN(user.zip_code)) {
      alert("Zip code must be 5 digits and US based.");
      return;
    }
    const response = await fetch("/api/update-profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify(user),
    });
    const result = await response.json();
    if (result.error) {
      alert(result.error);
      return;
    }
    alert("Profile updated successfully");
    setUser(result);
  };

  return (
    <div className="settings-container">
      <div className="sidebar">
        <div
          className="sidebar-item"
          onClick={go2Home}
        >
          Calendar
        </div>
        <div className="sidebar-item active">Settings</div>
      </div>
      <div className="content">
        <div className="section-title" style={{ color: "white" }}>
          Account Setting
        </div>
        <div className="profile-picture">
          <label className="Profile" />
        </div>
        <div className="form-field">
          <label htmlFor="name" style={{ color: "white" }}>
            Name
          </label>
          <input
            type="text"
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
            defaultValue={user.name}
            id="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="form-field">
          <label htmlFor="email" style={{ color: "white" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            defaultValue={user.email}
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-field">
          <label htmlFor="zipcode" style={{ color: "white" }}>
            Zip Code
          </label>
          <input
            type="text"
            maxLength={5}
            id="zipcode"
            defaultValue={user.zip_code}
            onChange={(e) => {
              setUser({ ...user, zip_code: e.target.value });
            }}
            placeholder="Enter your zip code"
          />
        </div>
        <div className="form-field">
          <label htmlFor="phone" style={{ color: "white" }}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            maxLength={10}
            defaultValue={user.phone_number}
            onChange={(e) => {
              setUser({ ...user, phone_number: e.target.value });
            }}
            placeholder="Enter your phone number"
          />
        </div>
        <div className="actions">
          <button className="update-profile" onClick={updateProfile}>
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
