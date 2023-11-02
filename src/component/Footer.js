import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <span className="text-muted">
          Chat App © {new Date().getFullYear()}
        </span>
      </Container>
    </footer>
  );
};

export default Footer;
