import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar/index";

function MainLayout(props) {
    return (
        <Fragment>
            <Header></Header>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Sidebar></Sidebar>
                    </Col>
                    <Col xs={8}>
                        {props.children ? props.children : <Outlet />}
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default MainLayout;
