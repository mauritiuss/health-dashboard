import React from "react";
import { Container, Header, Segment } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const StepsPage = () => {
  const navigate = useNavigate();

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
      <Segment raised>
        <Header as="h2">Ore di sonno</Header>
        <p>Qui verrà mostrato un grafico con le ore di sonno.</p>
        <button onClick={() => navigate(-1)}>Torna Indietro</button>
      </Segment>
    </Container>
    </div>
  );
};

export default StepsPage;