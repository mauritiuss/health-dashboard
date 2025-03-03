import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const CardInfo = ({ title, value, unit, icon, link }) => {
  const navigate = useNavigate();

  return (
    <Card
      raised
      style={{
        width: "250px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        marginTop: 0,
        marginBottom: 0
      }}
      onClick={() => navigate(link)} // Naviga alla pagina corrispondente
    >
      <Card.Content
      style={{
        flex: 1, // Occupa tutto lo spazio disponibile nella card
      }}
      >
        <Icon name={icon} size="huge" style={{ marginBottom: "20px" }} />
        <Card.Header>{title}</Card.Header>
        <Card.Description style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {value} {unit}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default CardInfo;