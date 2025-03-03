import React, { useEffect } from "react";
import Navbar from "./components/Navbar"; //Importa la Navbar
import CardInfo from "./components/CardInfo"; //Importa la Navbar
import { Container, Segment } from "semantic-ui-react";

function App() {
  useEffect(() => {
    document.body.style.overflowX = "hidden"; // Nasconde qualsiasi overflow orizzontale
    return () => {
      document.body.style.overflowX = "auto"; // Ripristina quando il componente viene smontato
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
    </>
  );
}

export default App;