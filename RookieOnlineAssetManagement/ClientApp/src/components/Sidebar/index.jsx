import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
    return (
        <div className="text-start">
            <img
                src="nash_logo.png"
                alt="nashtech logo"
                style={{ width: "50%" }}
            />
            <h5 className="text-nash-red">
                <b>Online Asset Management</b>
            </h5>
            <Card className="rounded-0 border-0 fw-bold fs-5">
                <Link to="" className="ListGroup__Link">
                    <Card.Header className="bg-nash-red rounded-0">
                        Home
                    </Card.Header>
                </Link>
                <ListGroup variant="flush" className="border-0 my-1">
                    <Link className="ListGroup__Link" to="ManageUser">
                        <ListGroup.Item
                            className="border border-white border-3"
                            style={{ background: "#eeeeee" }}
                        >
                            <Link to="/ManageUser">Manage User</Link>
                        </ListGroup.Item>
                    </Link>
                    <Link className="ListGroup__Link" to="">
                        <ListGroup.Item
                            className="border border-white border-3"
                            style={{ background: "#eeeeee" }}
                        >
                            Manage Asset
                        </ListGroup.Item>
                    </Link>
                    <Link className="ListGroup__Link" to="">
                        <ListGroup.Item
                            className="border border-white border-3"
                            style={{ background: "#eeeeee" }}
                        >
                            Manage Assignment
                        </ListGroup.Item>
                    </Link>
                    <Link className="ListGroup__Link" to="">
                        <ListGroup.Item
                            className="border border-white border-3"
                            style={{ background: "#eeeeee" }}
                        >
                            Request for Returning
                        </ListGroup.Item>
                    </Link>
                    <Link className="ListGroup__Link" to="">
                        <ListGroup.Item
                            className="border border-white border-3"
                            style={{ background: "#eeeeee" }}
                        >
                            Report
                        </ListGroup.Item>
                    </Link>
                </ListGroup>
            </Card>
        </div>
    );
};

export default Sidebar;
