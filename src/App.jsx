import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard";
import StepsPage from "./pages/details/Stepspage";
import HeartRatePage from "./pages/details/HeartRatePage";
import SleepPage from "./pages/details/SleepPage";
import TemperaturePage from "./pages/details/TemperaturePage";
import Documentation from "./pages/details/Documentation";

function App() {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.body.style.paddingTop = "60px";
    return () => {
      document.body.style.overflowX = "auto";
      document.body.style.paddingTop = "0px";
      
    };
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/steps" element={<StepsPage />} />
        <Route path="/heart-rate" element={<HeartRatePage />} />
        <Route path="/sleep" element={<SleepPage />} />
        <Route path="/temperature" element={<TemperaturePage />} />
        <Route path="/documentation" element={<Documentation/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;