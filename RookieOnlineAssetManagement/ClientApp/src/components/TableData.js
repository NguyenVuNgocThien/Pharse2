import React, { useEffect, useState } from 'react'
import ClassItem from './ClassItem'
import api, { endpoint } from "../api/api"
import Pagination from"./Pagination"
import { useNavigate } from "react-router-dom"
import { Form, Button, Dropdown, Table } from "react-bootstrap";

export default function TableData(props) {
    const [filter, setFilter] = useState('')
    const [userList, setUserList] = useState([])
    const [searchString, setSearchString] = useState()
    const [all, setAll] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [staff, setStaff] = useState(false)

  const navigate = useNavigate();

  const createNewUser = () => {
    navigate('/create-user')
    }
    useEffect(() => {
        const loadUser = async () => {
            let res = await api.get(endpoint['ListUser'])
            try {
                setUserList(res.data)
            }
            catch (err) {
                console.error(err);
            }
        }
        loadUser();
    }, [])
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
            let res = await api.get(endpoint['FindUser'](searchString))
            try {
                setUserList(res.data)
            }
            catch (err) {
                console.error(err);
            }
        }
        loadUser()
    }
    const handleSortByStaffCode = () => {
        const loadUser = async () => {
            let res = await api.get(endpoint['SortUser']("Staff Code"))
            try {
                setUserList(res.data)
            }
            catch (err) {
                console.error(err);
            }
        }
        loadUser()
    }
    const handleSortByName = () => {
        const loadUser = async () => {
            let res = await api.get(endpoint['SortUser']("Full Name"))
            try {
                setUserList(res.data)
            }
            catch (err) {
                console.error(err);
            }
        }
        loadUser()
    }
    const handleSortByJoinedDate = () => {
        const loadUser = async () => {
            let res = await api.get(endpoint['SortUser']("Joined Date"))
            try {
                setUserList(res.data)
            }
            catch (err) {
                console.error(err);
            }
        }
        loadUser()
    }
    const handleSortByType = () => {
        const loadUser = async () => {
            let res = await api.get(endpoint['SortUser']("Type"))
            try {
                setUserList(res.data)
            }
            catch (err) {
                console.error(err);
            }
        }
        loadUser()
    }
    const handleCheckbox = (event) => {
        if ((event.target.value) == "All") {
            setAll(event.target.checked)
        }
        if ((event.target.value) == "Admin") {
            setAdmin(event.target.checked)
        }
        if ((event.target.value == "Staff")) {
            setStaff(event.target.checked)
        }
    }
    const handleFilter = () => {
        if (all == true) {
            const loadUser = async () => {
                let res = await api.get(endpoint['ListUserByType']("All"))
                try {
                    setUserList(res.data)
                }
                catch (err) {
                    console.error(err);
                }
            }
            loadUser()
        }
      if (admin == true) {
            const loadUser = async () => {
                let res = await api.get(endpoint['ListUserByType']("Admin"))
                try {
                    setUserList(res.data)
                }
                catch (err) {
                    console.error(err);
                }
            }
            loadUser()
        } 
    if (staff == true) {
        const loadUser = async () => {
            let res = await api.get(endpoint['ListUserByType']("Staff"))
            try {
                setUserList(res.data)
            }
            catch (err) {
                console.error(err);
            }
        }
        loadUser()
    }
    }

  return (
    <div>
      <div className="row">
        <div className="col-sm-2">
                  <Dropdown>
                      <Dropdown.Toggle variant="light" className="col-md-12">
                          Type <Button onClick={handleFilter }>Loc</Button>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
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
                      </Dropdown.Menu>
                  </Dropdown>
        </div>
        <div className="col-sm-4">
        </div>
        <div className="col-sm-6 d-flex justify-content-between">
          <div className="input-group mb-3">
            <input type="text"
              className="form-control"
              placeholder="Search"
                          name='search'
                          value={searchString}
                          onChange={(event) => setSearchString(event.target.value)}
              >
            </input>
                      <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSearchUser}>
              <i className="bi bi-search"></i>
            </button>
          </div>

          <button className="btn btn-danger" onClick={createNewUser}>
            Create new user
          </button>
        </div>
      </div>
      <Table >
        <thead>
           <tr>
                      <th value="Staff Code" onClick={handleSortByStaffCode}>Staff Code</th>
                      <th value="Full Name" onClick={handleSortByName}>FullName</th>
                      <th>UserName</th>
                      <th value="Joined Date" onClick={handleSortByJoinedDate}>JoinedDate</th>
                      <th value="Type" onClick={handleSortByType}>Type</th>
          </tr>
        </thead>

              <tbody>
                  {userList.slice(indexOfFirstCourse, indexOfLastCourse).map((user, index) => {
                      return <ClassItem key={index} presentation={user} />
                  })}
        </tbody>
          </Table>
          <Pagination
              rowsPerPage={pagination.rowsPerPage}
              totalUsers={userList.length}
              paginate={paginate}
          />
    </div>
)
}
