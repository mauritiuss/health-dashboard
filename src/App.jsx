import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
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
            maxWidth: "100%", // Evita overflow
          }}
        >
          <Segment
            raised
            textAlign="center"
            style={{
              maxWidth: "600px",
              width: "90%",
              padding: "20px",
              background: "#ffffff",
              boxSizing: "border-box",
            }}
          >
            <h1>Benvenuto nella Dashboard</h1>
            <p>Qui verranno mostrati i dati della salute.</p>
          </Segment>
        </Container>
      </div>
    </>
  );
}

export default App;