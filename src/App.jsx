import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard"; // Importiamo la dashboard

function App() {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.body.style.paddingTop = "60px"; // Spazio per la navbar
    return () => {
      document.body.style.overflowX = "auto";
      document.body.style.paddingTop = "0px";
    };
  }, []);

  return (
    <>
      <Navbar />
      <Dashboard /> {/* Ora la dashboard è separata */}
      <Footer />
    </>
  );
}

export default App;