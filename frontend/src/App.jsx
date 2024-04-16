import Login from "./Login/Login";
import CustomerSignUp from "./Customer/CustomerSignUp/CustomerSignUp";
import ContractorSignUp from "./Contractor/ContractorSignUp/ContractorSignUp";
import Calendar from "./Customer/Calendar/Calendar";
import Home from "./Home/Home";
import ContractorView from "./Contractor/ContractorView";
import Features from "./Other/Features";
import PricingPage from "./Other/PricingPage";
import ContractorSettings from "./Settings/ContractorSettings";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SettingsPage from "./Settings/Settings";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/*  Previous path: /  */}
        <Route path="/customer-signup" element={<CustomerSignUp />} />{" "}
        {/*  Previous path: /Login  */}
        <Route path="/contractor-signup" element={<ContractorSignUp />} />{" "}
        {/*  Previous path: /customer-signup  */}
        <Route path="/calendar" element={<Calendar />} />{" "}
        {/*  Previous path: /contractor-signup  */}
        <Route path="/settings" element={<SettingsPage />} />{" "}
        {/*  Previous path: /settings  */}
        <Route
          path="/contractor-settings"
          element={<ContractorSettings />}
        />{" "}
        {/*  Previous path: /contractor-settings  */}
        <Route path="/contractor" element={<ContractorView />} />{" "}
        {/*  Previous path: /ContractorHomePage  */}
        <Route path="/features" element={<Features />} />{" "}
        {/*  Previous path: /Features  */}
        <Route path="/pricing" element={<PricingPage />} />{" "}
        {/*  Previous path: /Pricing  */}
      </Routes>
    </Router>
  );
}
