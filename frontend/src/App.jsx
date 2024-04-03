import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Landing from "./Landing";
import Landing2 from "./Landing2/Landing2";
import CustomerSignUp from "./CustomerSignUp/CustomerSignUp";
import ContractorSignUp from "./ContractorSignUp/ContractorSignUp";
import { Link, Route } from "wouter";

export default function App() {
  return (
    <>
      <Route path="/" component={Landing2} />
      <Route path="/customer-signup" component={CustomerSignUp} />
      <Route path="/contractor-signup" component={ContractorSignUp} />
    </>
  );
}
