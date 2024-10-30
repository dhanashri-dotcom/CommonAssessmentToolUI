import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import FormNew from "./components/FormNew";
import ResultPage from "./components/ResultPage";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import ClientSearch from "./components/ClientSearch";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/form" element={<FormNew />} />
            <Route path="/results" element={<ResultPage />} />
            <Route path="/clients" element={<ClientSearch />} />
            <Route path="/client/:clientId" element={<div>Client Details Page Placeholder</div>} /> {/* Placeholder */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
