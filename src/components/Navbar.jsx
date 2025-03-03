import React from "react";
import { Menu, Container } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu inverted fixed="top" borderless>
      <Container textAlign="center">
        <Menu.Item header style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          📊 Health Dashboard
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;