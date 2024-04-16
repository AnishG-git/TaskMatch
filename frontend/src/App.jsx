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
        <Route path="/login" element={<Login />} />
        <Route path="/customer-signup" element={<CustomerSignUp />} />
        <Route path="/contractor-signup" element={<ContractorSignUp />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/contractor-settings" element={<ContractorSettings />} />
        <Route path="/contractor" element={<ContractorView />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </Router>
  );
}
