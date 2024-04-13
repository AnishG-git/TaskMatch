import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Landing from "./Landing";
import Landing2 from "./Landing2/Landing2";
import CustomerSignUp from "./CustomerSignUp/CustomerSignUp";
import ContractorSignUp from "./ContractorSignUp/ContractorSignUp";
import HomePage from "./Homepage/Homepage";
import MainPage from "./MainPage/MainPage";
import Navbar from './Navbarp';
import ContractorHomePage from './ContractorHomePage';
import Navbarpo from './Navbarpo';
import Features from './Features';
import PricingPage from './PricingPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SettingsPage from "./Settings/Settings";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';




export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Login" element={<Landing2 />} />
        <Route path="/customer-signup" element={<CustomerSignUp />} />
        <Route path="/contractor-signup" element={<ContractorSignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/ContractorHomePage" element={<ContractorHomePage />} />
        <Route path="/Features" element={<Features />} />
        <Route path="/Pricing" element={<PricingPage />} />
      </Routes>
    </Router>
  );
}
