import React, { useEffect } from "react";
import Navbar from "./components/Navbar"; //Importa la Navbar
import CardInfo from "./components/CardInfo"; //Importa la CardInfo
import Footer from "./components/Footer"; //Importa il Footer
import { Container, Segment } from "semantic-ui-react";

function App() {
  useEffect(() => {
    document.body.style.overflowX = "hidden"; // Nasconde qualsiasi overflow orizzontale
    document.body.style.paddingTop = "60px"; // Imposta uno spazio pari all'altezza della Navbar
    return () => {
      document.body.style.overflowX = "auto"; // Ripristina quando il componente viene smontato
      document.body.style.paddingTop = "0px"; // Ripristina quando il componente viene smontato
    };
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f4f4",
          width: "100vw", // Assicura che non ci sia overflow orizzontale
          padding: "20px",
          boxSizing: "border-box",
          overflowX: "hidden", // Evita lo scroll orizzontale
        }}
      >
          <Container
          textAlign="center"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px", // Spazio tra le card
            maxWidth: "800px",
          }}
        >
          <CardInfo title="Passi Giornalieri" value="10,345" unit="steps" icon="male" />
          <CardInfo title="Frequenza Cardiaca" value="72" unit="bpm" icon="heartbeat" />
          <CardInfo title="Ore di Sonno" value="7.5" unit="h" icon="bed" />
          <CardInfo title="Temperatura del Polso" value="36.5" unit="°C" icon="thermometer half" />
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default App;