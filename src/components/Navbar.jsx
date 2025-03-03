import React from "react";
import { Menu, Container } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate("");
  };

  return (
    <Menu inverted fixed="top" borderless>
      <Container textAlign="center">
        <Menu.Item
          header
          style={{ fontSize: "1.5rem", fontWeight: "bold", cursor: "pointer" }}
          onClick={goToDashboard}
        >
          📊 Health Dashboard
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
