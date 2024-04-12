import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Landing from "./Landing";
import Landing2 from "./Landing2/Landing2";
import CustomerSignUp from "./CustomerSignUp/CustomerSignUp";
import ContractorSignUp from "./ContractorSignUp/ContractorSignUp";
import HomePage from "./Homepage/Homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SettingsPage from "./Settings/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing2 />} />
        <Route path="/customer-signup" element={<CustomerSignUp />} />
        <Route path="/contractor-signup" element={<ContractorSignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}
