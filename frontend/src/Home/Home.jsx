import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../index.css"; // Make sure this path is correct relative to where this file is located
import { useNavigate } from "react-router-dom";
import packageImage from "./package.jpeg";

const Home = () => {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              TaskMatch
            </Link>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/features">
                    Features
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/pricing">
                    Pricing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login/Register
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown mr-custom">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Contractor
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <Link className="dropdown-item" to="/contractor-signup">
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div className="image-container my-5">
        <img
          src={packageImage}
          className="img-fluid custom-img"
          alt="Package"
        />
      </div>

      <h1 className="parg text-center mb-5">
        Welcome to TaskMatch, the innovative platform designed to streamline the
        connection between clients with tasks and contractors ready to take on
        those tasks. In today’s fast-paced world, finding the right help for
        your needs or the right job for your skills can be a challenge.
        TaskMatch simplifies this process by offering a user-friendly interface
        where clients can effortlessly create a task list, and contractors can
        browse and accept jobs that align with their expertise. Whether you’re
        overwhelmed with tasks and looking for professional assistance or a
        contractor seeking your next job, TaskMatch is here to facilitate a
        seamless match. Our platform features real-time messaging, a progress
        tracking system, personalized calendars, and a detailed review system to
        ensure transparency and satisfaction on both ends. Join us to experience
        the future of task management and contractor engagement — where every
        task finds its perfect match.
      </h1>

      <footer className="bg-body-tertiary text-center">
        <div className="container p-4" />
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2024 Copyright:
          <Link className="text-body" to="https://mdbootstrap.com/">
            TaskMatch.com
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
