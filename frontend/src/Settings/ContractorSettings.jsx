import React from "react";
import "./Settings.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function ContractorSettings() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = location.state || {};
  const token = userInfo.token;
  const [user, setUser] = useState({
    company_name: userInfo.company_name,
    email: userInfo.email,
    zip_code: userInfo.zip_code,
    category: userInfo.category,
    phone_number: userInfo.phone_number,
  });

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
    navigate("/ContractorHomePage", { state: { userInfo: result } });
  }

  const updateProfile = async () => {
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
    setUser({
      company_name: result.company_name,
      email: result.email,
      zip_code: result.zip_code,
      category: result.category,
      phone_number: result.phone_number,
    });
  };

  return (
    <div className="settings-container">
      <div className="sidebar">
        <div className="sidebar-item" onClick={go2Home}>
          Your Requests
        </div>
        <div className="sidebar-item active">Settings</div>
      </div>
      <div className="content">
        <div className="section-title" style={{ color: "white" }}>
          Account Settings
        </div>
        <div className="profile-picture">
          <label className="Profile" />
        </div>
        <div className="form-field">
          <label htmlFor="company-name" style={{ color: "white" }}>
            Company Name
          </label>
          <input
            type="text"
            id="company-name"
            placeholder="Enter your company name"
            onChange={(e) => {
              setUser({ ...user, company_name: e.target.value });
            }}
            defaultValue={userInfo.company_name}
          />
        </div>
        <div className="form-field">
          <label htmlFor="email" style={{ color: "white" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={(e) => {
              setUser({ ...user, email: e.target.value });
            }}
            defaultValue={userInfo.email}
          />
        </div>
        <div className="form-field">
          <label htmlFor="name" style={{ color: "white" }}>
            Zip Code
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your zip code"
            onChange={(e) => {
              setUser({ ...user, zip_code: e.target.value });
            }}
            defaultValue={userInfo.zip_code}
          />
        </div>
        <div className="form-field">
          <label htmlFor="category" style={{ color: "white" }}>
            Category
          </label>
          <input
            type="text"
            id="category"
            placeholder="Enter your category"
            onChange={(e) => {
              setUser({ ...user, "category": e.target.value });
            }}
            defaultValue={userInfo.category}
          />
        </div>
        <div className="form-field">
          <label htmlFor="phone" style={{ color: "white" }}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Enter your phone number"
            onChange={(e) => {
              setUser({ ...user, phone_number: e.target.value });
            }}
            defaultValue={userInfo.phone_number}
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

export default ContractorSettings;
