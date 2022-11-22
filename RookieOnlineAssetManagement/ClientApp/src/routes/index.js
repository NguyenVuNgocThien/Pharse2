import { Fragment } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
// layout
import Layout from "../layout";
import MinimalLayout from "../layout/MinimalLayout";
import MainLayout from "../layout/MainLayout";
import Assignment from "../pages/Home";
import ErrorPage from "../pages/error";
import ManageUser from "../pages/ManageUser/index";
const Router = () => {
    return useRoutes([
        {
            path: "/",
            element: <MainLayout />,
            children: [
                {
                    path: "/",
                    element: <Assignment />,
                },
                {
                    path: "/ManageUser",
                    element: <ManageUser/>,
                },
            ],
        },
    ]);
};

export default Router;

// ============================
