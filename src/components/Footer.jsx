import React from "react";
import { Container } from "semantic-ui-react";

const Footer = () => {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#333",
        color: "white",
        textAlign: "center",
        width: "100%",
      }}
    >
      <Container>
        <p>&copy; {new Date().getFullYear()} Health Dashboard. Tutti i diritti riservati.</p>
      </Container>
    </div>
  );
};

export default Footer;