import { useState } from "react";
import "./CustomerSignUp.css";
import { useNavigate } from "react-router-dom";

export default function CustomerSignUp() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    zip_code: "",
    phone_number: "",
  });

  const [signUpStatus, setSignUpStatus] = useState("");

  const handleSignUp = async () => {
    console.log("userInfo: " + JSON.stringify(userInfo));
    if (
      userInfo.name === "" ||
      userInfo.email === "" ||
      userInfo.password === "" ||
      userInfo.zip_code === "" ||
      userInfo.phone_number === ""
    ) {
      setSignUpStatus("Please fill in all fields");
      return;
    }
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const result = await response.json();
    const error = result.error;
    if (error) {
      alert("Error signing up");
    }
    if (result.status) {
      setSignUpStatus(result.status);
    }
  };

  const back = () => {
    navigate("/login");
  };
  return (
    <div className="container" id="signUpForm">
      <button
        onClick={() => back()}
        className="back-btn"
        style={{ position: "absolute", top: "4rem", left: "4rem" }}
      >
        BACK
      </button>
      <h2 className="signup-title" style={{color: "white"}}>
        Welcome to your All-in-One Task Management Solution
      </h2>
      <div>
        <input
          type="text"
          placeholder="NAME"
          className="signup-field"
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="EMAIL"
          className="signup-field"
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          style={{ margin: "1rem" }}
        />
        <input
          type="password"
          placeholder="PASSWORD"
          className="signup-field"
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="ZIP CODE"
          className="signup-field"
          onChange={(e) =>
            setUserInfo({ ...userInfo, zip_code: e.target.value })
          }
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="tel"
          placeholder="PHONE NUMBER"
          className="signup-field"
          maxLength={10}
          onChange={(e) =>
            setUserInfo({ ...userInfo, phone_number: e.target.value })
          }
          style={{ marginLeft: "0.5rem" }}
        />
      </div>
      <button className="back-btn" style={{ margin: "1rem" }} onClick={handleSignUp}>
        SIGN UP
      </button>
      <p style={{ color: "white", margin: "1rem" }}>{signUpStatus}</p>
    </div>
  );
}
