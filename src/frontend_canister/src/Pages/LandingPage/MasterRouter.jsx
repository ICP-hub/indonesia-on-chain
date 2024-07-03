import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import PrivacyPolicy from "../../Components/Home/PrivacyPolicy";
import TermsOfUse from "../../Components/Home/TermAndCondition";
import Master from "./Master";



function MasterRouting() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Master />} >
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default MasterRouting;
