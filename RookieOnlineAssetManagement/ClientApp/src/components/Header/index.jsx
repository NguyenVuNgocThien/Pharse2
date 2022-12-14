import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./header.css";
import { ModalContext } from "../../context/ModalContext";


const Header = () => {
    const modalContext = useContext(ModalContext)

    const [username, setUsername] = useState("User");
    useEffect(() => {
        axios.get("/api/users").then((response) => {
            setUsername(response.data.userName);
        });
    }, []);


    function OpenModalLogout() {
        const newDataModal = {
            isShowModal: true,
            title: `Are you sure?`,
            content: 'Do you want to log out?',
            isShowButtonCloseIcon: false,
            isShowButtonClose: true,
            isShowButtonFunction: true,
            contentButtonFunction: 'Log out',
            contentButtonClose: 'Cancel',
            handleFunction: HandleLogout
        }
        modalContext.HandleSetModalData(newDataModal)

    }

    const HandleLogout = () => {
        axios.get('/api/Users/Logout')
            .then(() => {
                window.location.href = "/Identity/Account/Login?returnUrl=" + window.location.pathname;
            })
    }

    function OpenModalChangePassword() {
        const modal = document.querySelector(".modal-ChangePassword");
        modal && modal.classList.add("show")
    }




    return (
        <Navbar expand="lg" className="bg-nash-red" variant="dark">
            <Container>
                <Navbar.Brand href="#">Home</Navbar.Brand>
                <Nav className="justify-content-end">
                    <NavDropdown title={username}>
                        <NavDropdown.Item onClick={OpenModalChangePassword}>
                            Change password
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={OpenModalLogout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
