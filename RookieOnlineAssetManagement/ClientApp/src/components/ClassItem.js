import React, { useContext } from "react";
import { ModalContext } from "../ModalContext";

export default function ClassItem(props) {
    const { presentation } = props;
    const modalContext = useContext(ModalContext);

    var date = new Date(presentation.joinedDate);
    var month = date.getMonth() + 1;
    const items = [
        presentation.staffCode,
        presentation.fullName,
        presentation.userName,
        date.getDate() + "/" + month + "/" + date.getFullYear(),
        presentation.type == 1 ? "Admin" : "Staff",
    ];

    const showUserInfo = () => {
        const userData = (
            <div class="container" style={{ width: "300px" }}>
                <div class="row mb-3">
                    <div class="col-5">Staff Code</div>
                    <div class="col-7">Insert data here</div>
                </div>
                <div class="row mb-3">
                    <div class="col-5">Full Name</div>
                    <div class="col-7">Insert data here</div>
                </div>
                <div class="row mb-3">
                    <div class="col-5">Username</div>
                    <div class="col-7">Insert data here</div>
                </div>
                <div class="row mb-3">
                    <div class="col-5">Date of Birth</div>
                    <div class="col-7">Insert data here</div>
                </div>
                <div class="row mb-3">
                    <div class="col-5">Gender</div>
                    <div class="col-7">Insert data here</div>
                </div>
                <div class="row mb-3">
                    <div class="col-5">Joined Date</div>
                    <div class="col-7">Insert data here</div>
                </div>
                <div class="row mb-3">
                    <div class="col-5">Type</div>
                    <div class="col-7">Insert data here</div>
                </div>
                <div class="row mb-3">
                    <div class="col-5">Location</div>
                    <div class="col-7">Insert data here</div>
                </div>
            </div>
        );

        const newDataModal = {
            isShowModal: true,
            title: "Detailed User Information",
            content: userData,
            isShowButtonCloseIcon: true,
            isShowButtonClose: false,
            isShowButtonFunction: false,
            contentButtonFunction: "",
            contentButtonClose: "Close",
            handleFunction: null,
        };
        modalContext.HandleSetModalData(newDataModal);
    };

    return (
        <tr>
            {[...items].map((item, index) => (
                <td className="align-middle" key={index}>
                    {item}
                </td>
            ))}
            <td>
                <i
                    onClick={showUserInfo}
                    className="bi bi-pencil-fill pe-3"
                    style={{ color: "grey" }}
                ></i>
                <i className="bi bi-x-circle" style={{ color: "red" }}></i>
            </td>
        </tr>
    );
}
