import { useState } from "react";
import "./Landing2.css";
import { useLocation } from "wouter";
import CustomerSignUp from "../CustomerSignUp/CustomerSignUp";

export default function Landing2() {
  const [location, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const customerSignUp = () => {
    setLocation("/customer-signup");
  };

  const contractorSignUp = () => {
    setLocation("/contractor-signup");
  };

  const go2Home = () => {
    setLocation("/home");
  };

  const handleLogin = async () => {
    
    if (email === "" || password === "") {
      setLoginStatus("Please fill in all fields");
      return;
    }
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const result = await response.json();
    const token = result.token;
    const error = result.error;
    if (error) {
      setLoginStatus("Error logging in");
    }
    if (token) {
      setLoginStatus("Login successful");
      go2Home();
      document.cookie = `token=${token}; path=/; httpOnly;`;
    }
  };

  return (
    <div className="container" id="landingPage">
      <h1>
        Welcome to <span>TaskMatch</span>
      </h1>
      <p>Your All-in-One Task Management Solution</p>
      <form>
        <div className="form-group">
          <input type="email" placeholder="EMAIL" className="login-field" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <input type="password" placeholder="PASSWORD" className="login-field" onChange={(e) => setPassword(e.target.value)}/>
        </div>
      </form>
      <div className="buttons">
        <button type="submit" className="btn" id="signInBtn" onClick={handleLogin}>
          SIGN IN
        </button>
        <button className="btn" id="signUpBtn" onClick={customerSignUp}>
          SIGN UP
        </button>
      </div>
      <p>{loginStatus}</p>
      <div className="contractor-section">
        <p className="contractor-text">Contractor?</p>
        <div className="contractor-buttons">
          <button className="btn contractor-btn" id="contractorSignUpBtn" onClick={contractorSignUp}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
}
