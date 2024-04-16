import React, { useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../index.css";
const Navbarp = (userInfo) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <li className="navbar-brand">Tasks</li>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav"></ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Settings
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link
                    className="dropdown-item"
                    to={
                      userInfo.is_contractor === "false" ||
                      userInfo.userInfo.is_contractor === "false"
                        ? "/settings"
                        : "/contractor-settings"
                    }
                    state={userInfo}
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/"}>
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbarp;
