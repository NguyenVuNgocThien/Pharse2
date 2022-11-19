import { useState } from "react";
import { useForm } from "react-hook-form";
import Table from "react-bootstrap/Table";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import { Button, Modal } from "react-bootstrap";
import "./home.css";

const Assignment = () => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);

    return (
        <div>
            <h4>My Assignment</h4>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Asset Code</th>
                        <th>Asset Name</th>
                        <th>Category</th>
                        <th>Assigned Date</th>
                        <th>State</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>LA 10002</td>
                        <td>Laptop HP</td>
                        <td>Laptop</td>
                        <td>10/04/2019</td>
                        <td>Accepted</td>
                        <td>
                            <CheckIcon />
                            <CloseIcon />
                            <ReplayIcon />
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
                className="modal"
            >
                <Modal.Header className="modal__header">
                    <Modal.Title>Change password</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal__body">
                    This is the first time you logged in.<br></br>
                    You have to change your password to continue.
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group modal__imput-group">
                            <label className="input-group__label align-middle">
                                New password{" "}
                            </label>
                            <input
                                {...register("Password", { required: true })}
                                className="form-control"
                                type="password"
                            />
                        </div>
                        {errors.Password && (
                            <span>Password cannot be empty</span>
                        )}
                        <div className="d-flex justify-content-end">
                            <Button
                                variant="secondary"
                                onClick={handleClose}
                                className="modal__btn "
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Assignment;
