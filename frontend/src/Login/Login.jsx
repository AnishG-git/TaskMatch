import { useState } from "react";

// import { useLocation } from "wouter";
import { useNavigate } from "react-router-dom";
import Navbarp from "../Navbar/Navbarp";
import "./Login.css";
import "../../index.css";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const customerSignUp = () => {
    navigate("/customer-signup");
  };

  const go2Home = (userInfo) => {
    navigate("/calendar", { state: { userInfo } });
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
    let result = await response.json();
    const token = result.token;
    const error = result.error;
    if (error) {
      setLoginStatus("Error logging in");
    }
    if (token) {
      setLoginStatus("Login successful");
      console.log(JSON.stringify(result));
      if (result.is_contractor === "true") {
        navigate("/contractor", { state: { userInfo: result } });
      } else {
        go2Home(result);
      }
    }
  };

  return (
    <div className="container" id="landingPage">
      <Navbarp />

      <h1 style={{ color: "white" }}>
        Welcome to <span>TaskMatch</span>
      </h1>
      <p style={{ color: "white" }}>Your All-in-One Task Management Solution</p>
      <form>
        <div className="form-group">
          <input
            type="email"
            placeholder="EMAIL"
            className="login-field"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="PASSWORD"
            className="login-field"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
      <div className="buttons">
        <button
          type="submit"
          className="back-btn"
          id="signInBtn"
          onClick={handleLogin}
          style={{ marginRight: "1rem" }}
        >
          SIGN IN
        </button>
        <button
          className="back-btn"
          id="signUpBtn"
          onClick={customerSignUp}
          style={{ marginLeft: "1rem" }}
        >
          SIGN UP
        </button>
      </div>
      <p style={{ color: "white" }}>{loginStatus}</p>
    </div>
  );
}
