import React, { useEffect, useState } from "react";
import ClassItem from "./ClassItem";
import api, { endpoint } from "../api/api";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import { Form, Button, Dropdown, Table, ButtonGroup } from "react-bootstrap";

export default function TableData(props) {
    const [filter, setFilter] = useState("");
    const [userList, setUserList] = useState([]);
    const [totalUser, setTotalUser] = useState([]);
    const [searchString, setSearchString] = useState();
    const [all, setAll] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [staff, setStaff] = useState(false);

    const navigate = useNavigate();

    const createNewUser = () => {
        navigate("/create-user");
    };
    useEffect(() => {
        const loadUser = async () => {
            let res = await api.get(endpoint["Users"](initialPagination.currentPage - 1, 'null', 'null', 'null'));
            try {
                console.info(initialPagination.currentPage)
                console.info(res.data)
                setTotalUser(res.data);
                setUserList(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        loadUser();
    }, []);
    const initialPagination = {
        rowsPerPage: 5,
        currentPage: 1,
    };
    const [pagination, setPagination] = useState(initialPagination);

    const paginate = (pageNumber, rowsPerPage) => {
        setPagination({
            rowsPerPage:
                rowsPerPage === "All" ? userList.length : parseInt(rowsPerPage),
            currentPage: pageNumber,
        });
    };

    const indexOfLastCourse = pagination.currentPage * pagination.rowsPerPage;
    const indexOfFirstCourse = indexOfLastCourse - pagination.rowsPerPage;

    const handleSearchUser = () => {
        const loadUser = async () => {
            let res = await api.get(endpoint["Users"](0, "null", searchString, "null"));
            try {
                setUserList(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        loadUser();
    };
    const handleSortByStaffCode = () => {
        const loadUser = async () => {
            if (admin == true && staff == false && all == false) {
                let res = await api.get(endpoint["Users"](0, "Admin", "null", "Staff Code"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (staff == true && admin == false && all == false) {
                let res = await api.get(endpoint["Users"](0, "Staff", "null", "Staff Code"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (all == true || (admin == true && staff == true) || (admin == true && all == true) || (all == true && staff == true)) {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Staff Code"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString != null) {
                let res = await api.get(endpoint["Users"](0, "null", searchString, "Staff Code"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else  {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Staff Code"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        loadUser();
    };
    const handleSortByName = () => {
        const loadUser = async () => {
            if (admin == true && staff == false && all == false) {
                let res = await api.get(endpoint["Users"](0, "Admin", "null", "Full Name"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (staff == true && admin == false && all == false) {
                let res = await api.get(endpoint["Users"](0, "Staff", "null", "Full Name"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (all == true || (admin == true && staff == true) || (admin == true && all == true) || (all == true && staff == true)) {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Full Name"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString != null) {
                let res = await api.get(endpoint["Users"](0, "null", searchString, "Full Name"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Full Name"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        loadUser();
    };
    const handleSortByJoinedDate = () => {
        const loadUser = async () => {
            if (admin == true && staff == false && all == false) {
                let res = await api.get(endpoint["Users"](0, "Admin", "null", "Joined Date"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (staff == true && admin == false && all == false) {
                let res = await api.get(endpoint["Users"](0, "Staff", "null", "Joined Date"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (all == true || (admin == true && staff == true) || (admin == true && all == true) || (all == true && staff == true)) {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Joined Date"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString != null) {
                let res = await api.get(endpoint["Users"](0, "null", searchString, "Joined Date"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Joined Date"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        loadUser();
    };
    const handleSortByType = () => {
        const loadUser = async () => {
            if (admin == true && staff == false && all == false) {
                let res = await api.get(endpoint["Users"](0, "Admin", "null", "Type"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (staff == true && admin == false && all == false) {
                let res = await api.get(endpoint["Users"](0, "Staff", "null", "Type"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            } 
            else if (all == true || (admin == true && staff == true) || (admin == true && all == true) || (all == true && staff == true)) {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Type"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else if (searchString != null) {
                let res = await api.get(endpoint["Users"](0, "null", searchString, "Type"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
            else {
                let res = await api.get(endpoint["Users"](0, "All", "null", "Type"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        loadUser();
    };
    const handleCheckbox = (event) => {
        if (event.target.value == "All") {
            setAll(event.target.checked);
        }
        if (event.target.value == "Admin") {
            setAdmin(event.target.checked);
        }
        if (event.target.value == "Staff") {
            setStaff(event.target.checked);
        }
    };
    const handleFilter = () => {
        if (all == true || (admin == true && staff == true) || (admin == true && all == true) || (all == true && staff == true)) {
            const loadUser = async () => {
                let res = await api.get(endpoint["Users"](0, "All", "null", "null"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            };
            loadUser();
        }
        else if (admin == true) {
            const loadUser = async () => {
                let res = await api.get(endpoint["Users"](0, "Admin", "null", "null"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            };
            loadUser();
        }
        else if (staff == true) {
            const loadUser = async () => {
                let res = await api.get(endpoint["Users"](0, "Staff", "null", "null"));
                try {
                    setUserList(res.data);
                } catch (err) {
                    console.error(err);
                }
            };
            loadUser();
        }
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <div className="row">
                <h4 className="text-start text-nash-red">User list</h4>
                <div className="col-sm-4 text-start">
                    <Dropdown as={ButtonGroup} align="end" size="sm">
                        <Button
                            variant="outline-dark"
                            style={{
                                width: "100px",
                                textAlign: "left",
                                paddingLeft: "10px",
                            }}
                        >
                            Type
                        </Button>
                        <Dropdown.Toggle
                            split
                            variant="outline-dark"
                        ></Dropdown.Toggle>
                        <Dropdown.Menu
                            style={{
                                minWidth: "120px",
                                padding: "10px",
                            }}
                        >
                            <Form.Check
                                type="checkbox"
                                id="All"
                                label="All"
                                value="All"
                                checked={all}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Admin"
                                label="Admin"
                                value="Admin"
                                checked={admin}
                                onChange={handleCheckbox}
                            />
                            <Form.Check
                                type="checkbox"
                                id="Staff"
                                label="Staff"
                                value="Staff"
                                checked={staff}
                                onChange={handleCheckbox}
                            />
                            <Button
                                onClick={handleFilter}
                                size="sm"
                                variant="danger"
                                style={{
                                    backgroundColor: "#cf2338",
                                    width: "95px",
                                }}
                            >
                                Ok
                            </Button>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="col-sm-5 d-flex">
                    <div
                        className="input-group mb-3 input-group-sm"
                        style={{ height: "30px" }}
                    >
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            name="search"
                            value={searchString}
                            onChange={(event) =>
                                setSearchString(event.target.value)
                            }
                        ></input>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                            onClick={handleSearchUser}
                        >
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </div>

                <div className="col-sm-3">
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={createNewUser}
                    >
                        Create new user
                    </button>
                </div>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th value="Staff Code" onClick={handleSortByStaffCode}>
                            Staff Code<i className="bi bi-caret-down-fill ms-1"></i>
                        </th>
                        <th value="Full Name" onClick={handleSortByName}>
                            FullName<i className="bi bi-caret-down-fill ms-1"></i>
                        </th>
                        <th>UserName</th>
                        <th
                            value="Joined Date"
                            onClick={handleSortByJoinedDate}
                        >
                            JoinedDate<i className="bi bi-caret-down-fill ms-1"></i>
                        </th>
                        <th value="Type" onClick={handleSortByType}>
                            Type<i className="bi bi-caret-down-fill ms-1"></i>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {userList
                        .slice(indexOfFirstCourse, indexOfLastCourse)
                        .map((user, index) => {
                            return (
                                <ClassItem key={index} presentation={user} />
                            );
                        })}
                </tbody>
            </Table>
            <Pagination
                rowsPerPage={pagination.rowsPerPage}
                totalUsers={userList.length}
                paginate={paginate}
            />
        </div>
    );
}
