import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar/index";
import ModalCustom from "../../components/ModalCustom";
import ModalChangePassword from "../../components/ModalChangePassword";
import './MainLayout.css'
import { ModalContext } from "../../context/ModalContext";

function MainLayout(props) {
    const modalContext = useContext(ModalContext)

    return (
        <Fragment>
            <Header></Header>
            <Container className="mt-5">
                <div className="overlay"></div>
                <Row>
                    <Col xs={4}>
                        <Sidebar></Sidebar>
                    </Col>
                    <Col xs={8} className="position-relative">

                        <ModalCustom
                            modalData={modalContext.modalData}
                        />

                        <ModalChangePassword />
                        {props.children ? props.children : <Outlet />}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default MainLayout;
