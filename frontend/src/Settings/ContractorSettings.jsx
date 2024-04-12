import React from 'react';
import './settings.css';

function ContractorSettings() {
  return (
    <div className="settings-container">
      <div className="sidebar">
        <div className="sidebar-item">Home</div>
        <div className="sidebar-item">Calendar</div>
        <div className="sidebar-item">Your Activity</div>
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
          <label htmlFor="ratings">Ratings</label>
          <div className="rating-stars">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="company-name">Company Name</label>
          <input type="text" id="company-name" placeholder="Enter your company name" />
        </div>
        <div className="form-field">
          <label htmlFor="category">Category</label>
          <input type="text" id="category" placeholder="Enter your category" />
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

export default ContractorSettings;