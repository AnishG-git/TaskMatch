import { useState } from "react";
import "./ContractorSignUp.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function ContractorSignUp() {
  const navigate = useNavigate();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState({
    company_name: "",
    email: "",
    password: "",
    zip_code: "",
    phone_number: "",
    category: "",
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
    } else if (userInfo.phone_number.length !== 10 || isNaN(userInfo.phone_number)) {
      setSignUpStatus("Phone number must be 10 digits, no dashes or extensions.");
      return;
    } else if (userInfo.zip_code.length !== 5 || isNaN(userInfo.zip_code)) {
      setSignUpStatus("Zip code must be 5 digits and US based.");
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
    navigate(-1);
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
      <h2 className="signup-title" style={{ color: "white" }}>
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
          maxLength={5}
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
          style={{ margin: "1rem" }}
        />
        {/* <input
          type="text"
          placeholder="CATEGORY"
          className="signup-field"
          onChange={(e) =>
            setUserInfo({ ...userInfo, category: e.target.value })
          }
        /> */}
        <select
          style={{
            width: "20%",
            height: "40px",
            fontSize: "15px",
            borderRadius: "5px",
            border: "1px solid white",
            padding: "5px",
            marginBottom: "20px",
          }}
          className="signup-field"
          id="category"
          defaultValue={"none"}
          placeholder="CATEGORY"
          onChange={(e) => {
            userInfo.category === "none" || userInfo.category === ""
              ? setUserInfo({ ...userInfo, category: e.target.value })
              : {};
          }}
        >
          <option value="none" disabled hidden style={{color: "gray"}}>
            CATEGORY
          </option>
          <option value="Work">Work</option>
          <option value="HVAC">HVAC</option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Construction">Construction</option>
            <option value="Landscaping">Landscaping</option>
            <option value="Miscellaneous">Miscellaneous</option>
        </select>
      </div>
      <button
        className="back-btn"
        style={{ margin: "1rem" }}
        onClick={handleSignUp}
      >
        SIGN UP
      </button>
      <p style={{ color: "white", margin: "1rem" }}>{signUpStatus}</p>
    </div>
  );
}
