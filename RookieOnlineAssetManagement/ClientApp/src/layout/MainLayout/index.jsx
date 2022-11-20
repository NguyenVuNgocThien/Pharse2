import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar/index";
import ModalCustom from "../../components/ModalCustom";
import { ModalContext } from "../../ModalContext";
function MainLayout(props) {
    const modalContext = useContext(ModalContext);
    return (
        <Fragment>
            <Header></Header>
            <Container fluid>
                <Row>
                    <Col xs={4}>
                        <Sidebar></Sidebar>
                    </Col>
                    <Col xs={8}>
                        <ModalCustom modalData={modalContext.modalData} />
                        {props.children ? props.children : <Outlet />}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default MainLayout;
