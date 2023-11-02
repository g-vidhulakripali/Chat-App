import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = ({ userId, setUserId }) => {
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user full name from /auth/profile/:userId
    if (userId) {
      axios
        .get(`http://localhost:3001/auth/profile/${userId}`)
        .then((response) => setFullName(response.data.fullname))
        .catch((error) => console.error("Error fetching user profile", error));
    }
  }, [userId]);

  const logout = () => {
    // Clear userId (you can use your actual logic to clear the user session)
    setUserId(null);

    // Redirect to the home page
    navigate("/");
  };

  return (
    <Navbar bg="purple" expand="lg" variant="dark">
      <Navbar.Brand href="/">Chat App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/chat">Home</Nav.Link>
        </Nav>
        <Nav className="ml-auto navbar-right">
          <Navbar.Text className="text-white">
            {fullName && `Welcome, ${fullName}`}
          </Navbar.Text>
          {fullName && (
            <Nav.Link href="/" onClick={logout} className="text-white">
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
