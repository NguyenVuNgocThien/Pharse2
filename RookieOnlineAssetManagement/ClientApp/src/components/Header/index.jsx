import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./header.css";
const Header = () => {
    const [username, setUsername] = useState("User");
    useEffect(() => {
        axios.get("/api/users").then((response) => {
            setUsername(response.data.userName);
        });
    }, []);
    console.log(username);
    return (
        <Navbar expand="lg" className="bg-nash-red" variant="dark">
            <Container>
                <Navbar.Brand href="#">Home</Navbar.Brand>
                <Nav className="justify-content-end">
                    <NavDropdown title={username}>
                        <NavDropdown.Item href="#logout">
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
