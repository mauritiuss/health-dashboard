import React from "react";
import { Container } from "semantic-ui-react";
import CardInfo from "../components/CardInfo";

const Dashboard = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        width: "100vw",
        padding: "20px",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <Container
        textAlign="center"
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          maxWidth: "800px",
        }}
      >
        <CardInfo title="Passi Giornalieri" value="10,345" unit="steps" icon="male" link="/steps"/>
        <CardInfo title="Frequenza Cardiaca" value="72" unit="bpm" icon="heartbeat" link="/heart-rate"/>
        <CardInfo title="Ore di Sonno" value="7.5" unit="h" icon="bed" link="/sleep"/>
        <CardInfo title="Temperatura del Polso" value="36.5" unit="°C" icon="thermometer half" link="/temperature"/>
      </Container>
    </div>
  );
};

export default Dashboard;