// Routes.jsx
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    DASHBOARD_ROUTE,
    KYC_ROUTE,
} from "./constant/routes";

import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import KYCPage from "./pages/KYCPage";

import MainLayout from "./layouts/MainLayout";
import UnAuthLayout from "./layouts/UnAuthLayout";
import AuthPages from "./components/Login";
import SignupPage from "./components/Signup";

// Temporary local auth check
const isAuthenticated = () => {
    // Use localStorage token for demo; replace with Redux or context later
    // const authToken = localStorage.getItem("auth_token");
    // return !!authToken;
    return false
};

const router = createBrowserRouter([
    // Public Pages
    {
        element: <MainLayout />,
        children: [
            // { path: `${HOME_ROUTE}/:id`, element: <DonationPage /> },
            { path: HOME_ROUTE, element: <HomePage /> },
            { path: KYC_ROUTE, element: <KYCPage /> },
        ]
    },
    {
        element: <UnAuthLayout />,
        children: [
            {
                path: LOGIN_ROUTE,
                element: !isAuthenticated() ? <AuthPages /> : <Navigate to={DASHBOARD_ROUTE} />
            },
            {
                path: REGISTER_ROUTE,
                element: !isAuthenticated() ? <SignupPage /> : <Navigate to={DASHBOARD_ROUTE} />
            }
        ]
    },
    // Protected pages

    // 404 fallback
    { path: "*", element: <PageNotFound /> }
]);

export default router;
