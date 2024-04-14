import React from 'react';
import './Settings.css';
import { useNavigate, useLocation } from 'react-router-dom';



function SettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = location.state || {};

  function go2Home() {
    navigate("/home", { state: { userInfo }});
  }

  return (
    <div className="settings-container">
      <div className="sidebar">
        <div className="sidebar-item" onClick={go2Home}>Calendar</div>
        <div className="sidebar-item active">Settings</div>
      </div>
      <div className="content">
        <div className="section-title">Account Setting</div>
        <div className="profile-picture">
          <label className="Profile" />
        </div>
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div className="form-field">
          <label htmlFor="zipcode">Zip Code</label>
          <input type="text" id="zipcode" placeholder="Enter your zip code" />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" placeholder="Enter your phone number" />
        </div>
        <div className="form-field">
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" placeholder="Write a short bio"></textarea>
        </div>
        <div className="actions">
          <button className="update-profile">Update Profile</button>
          <button className="reset">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;