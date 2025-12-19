// Routes.jsx
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    DASHBOARD_ROUTE,
    KYC_ROUTE,
    DONATION_ROUTE,
    OTPVERIFY_ROUTE,
    CAMPAIGN_ROUTE,
    CAMPAIGN_CREATE_ROUTE,
    MILESTONE_VERIFICATION_ROUTE,
} from "./constant/routes";

import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import KYCPage from "./pages/KYCPage";

import MainLayout from "./layouts/MainLayout";
import UnAuthLayout from "./layouts/UnAuthLayout";
import SignupPage from "./components/Signup";
import DonationPage from "./pages/DonationPage";
import OTPVerificationPage from "./pages/OTPVerificationPage";
import AuthLayout from "./layouts/AuthLayout";
import CreateProjectPage from "./pages/CreateProjectPage";
import Login from "./components/Login";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboard from "./pages/AdminDashboard";
import MilestoneVerification from "./pages/MilestoneVerification";
import CampaignsPage from "./pages/CampaignsPage";

const Dashboard = () => (
    <div className="p-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-4">Welcome to your dashboard</p>
    </div>
);

// Temporary local auth check — use stored tokens if present
const isAuthenticated = () => {
  try {
    const authToken = localStorage.getItem("auth_token");
    const csrfToken = localStorage.getItem("csrfToken");
    return !!authToken || !!csrfToken;
  } catch (err) {
    return false;
  }
};

const router = createBrowserRouter([
    // Public Pages
    {
        element: <MainLayout />,
        children: [
            { path: HOME_ROUTE, element: <HomePage /> },
            { path: `${DONATION_ROUTE}/:id`, element: <DonationPage /> },
            { path: KYC_ROUTE, element: <KYCPage /> },
            { path: DASHBOARD_ROUTE, element: <Dashboard /> },
            { path: CAMPAIGN_ROUTE, element: <CampaignsPage /> }

        ]
    },
    {
        element: <UnAuthLayout />,
        children: [
            {
                path: LOGIN_ROUTE,
                element: !isAuthenticated() ? <Login /> : <Navigate to={DASHBOARD_ROUTE} />
            },
            {
                path: REGISTER_ROUTE,
                element: !isAuthenticated() ? <SignupPage /> : <Navigate to={DASHBOARD_ROUTE} />
            },
            {
                path: OTPVERIFY_ROUTE,
                element: <OTPVerificationPage />
            }
        ]
    },
    // Protected pages
  {
    element: <AuthLayout />,
    children: [
      {
        path: DASHBOARD_ROUTE,
        element: isAuthenticated() ? <DashboardPage /> : <Navigate to={LOGIN_ROUTE} />
      },
      {
        path: '/admin/dashboard',
        element: isAuthenticated() ? <AdminDashboard /> : <Navigate to={LOGIN_ROUTE} />
      },
      {
        path: CAMPAIGN_CREATE_ROUTE,
        element: isAuthenticated() ? <CreateProjectPage /> : <Navigate to={LOGIN_ROUTE} />
      },
      {
        path: MILESTONE_VERIFICATION_ROUTE,
        element: isAuthenticated() ? <MilestoneVerification /> : <Navigate to={LOGIN_ROUTE} />
      }
    ]
  },

    // 404 fallback
    { path: "*", element: <PageNotFound /> }
]);

export default router;
