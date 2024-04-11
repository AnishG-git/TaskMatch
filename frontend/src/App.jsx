import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Landing from "./Landing";
import Landing2 from "./Landing2/Landing2";
import CustomerSignUp from "./CustomerSignUp/CustomerSignUp";
import ContractorSignUp from "./ContractorSignUp/ContractorSignUp";
import TDL2 from "./TDL2/TDL2";
import ConfirmationPage from "./ConfirmationPage"; // assuming you have this component
import { Route, Link } from "wouter";

export default function App() {
  return (
    <>
      <Route path="/" component={Landing2} />
      <Route path="/customer-signup" component={CustomerSignUp} />
      <Route path="/contractor-signup" component={ContractorSignUp} />
      <Route path="/todolist" component={TDL2} />
      <Route path="/confirm" component={ConfirmationPage} />
    </>
  );
}
