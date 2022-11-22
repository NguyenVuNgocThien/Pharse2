import React, { useEffect, useState } from "react";

export default function Pagination(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const toPreviousPage = (e) => {
        e.preventDefault();
        var newPage = currentPage - 1;
        props.paginate(newPage, "5");
        setCurrentPage(newPage);
    };

    const toNextPage = (e) => {
        e.preventDefault();
        var newPage = currentPage + 1;
        props.paginate(newPage, "5");
        setCurrentPage(newPage);
    };

    const paginate = (number, rowsPerPage) => {
        setCurrentPage(number);
        props.paginate(number, rowsPerPage);
    };

    const { rowsPerPage, totalUsers } = props;

    const pageNumbers = [];

    const length = Math.ceil(totalUsers / rowsPerPage);

    for (let i = 1; i <= length; i++) {
        pageNumbers.push(i);
    }

    var paginationNumber = pageNumbers.map((number) => (
        <li
            key={number}
            className={
                number === currentPage ? "page-item active" : "page-item"
            }
        >
            <a
                href="/dashboard"
                className="page-link"
                onClick={(e) => {
                    e.preventDefault();
                    paginate(number, rowsPerPage);
                }}
            >
                {number}
            </a>
        </li>
    ));

    return (
        <div className="d-flex justify-content-end">
            <nav style={{ margin: "0 0 0 30px", display: "flex" }}>
                <ul className="pagination justify-content-end m-0">
                    <li className="page-item">
                        <a
                            className={
                                currentPage === 1
                                    ? "page-link disabled"
                                    : "page-link"
                            }
                            href="/dashboard"
                            onClick={(e) => toPreviousPage(e)}
                        >
                            Previous
                        </a>
                    </li>
                    {paginationNumber}
                    <li className="page-item">
                        <a
                            className={
                                currentPage === length
                                    ? "page-link disabled"
                                    : "page-link"
                            }
                            href="/dashboard"
                            onClick={(e) => toNextPage(e)}
                        >
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
