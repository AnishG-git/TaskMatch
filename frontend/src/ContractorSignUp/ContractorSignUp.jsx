import { useState } from "react";
import "./ContractorSignUp.css";
import { useLocation } from "wouter";

export default function ContractorSignUp() {
  const [location, setLocation] = useLocation();

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
      userInfo.company_name === "" ||
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
    setLocation("/");
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
      <h2 className="signup-title">
        Contractor Registration
      </h2>
      <div>
        <input
          type="text"
          placeholder="COMPANY NAME"
          className="signup-field"
          onChange={(e) =>
            setUserInfo({ ...userInfo, company_name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="EMAIL"
          className="signup-field"
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
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
        />
        <input
          type="tel"
          placeholder="PHONE NUMBER"
          className="signup-field"
          maxLength={10}
          onChange={(e) =>
            setUserInfo({ ...userInfo, phone_number: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="CATEGORY"
          className="signup-field"
          onChange={(e) =>
            setUserInfo({ ...userInfo, category: e.target.value })
          }
        />
      </div>
      <button className="btn" style={{ margin: "1rem" }} onClick={handleSignUp}>
        SIGN UP
      </button>
      <p style={{ color: "white", margin: "1rem" }}>{signUpStatus}</p>
    </div>
  );
}