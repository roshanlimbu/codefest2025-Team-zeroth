import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { LOGIN_ROUTE, REGISTER_ROUTE, KYC_ROUTE, OTPVERIFY_ROUTE } from "../constant/routes";

const useProfileCheck = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showKYCModal, setShowKYCModal] = useState(false);
    const [needsKYC, setNeedsKYC] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we're on an auth page where redirect shouldn't happen
    const isAuthPage = [LOGIN_ROUTE, REGISTER_ROUTE, OTPVERIFY_ROUTE].some(
        route => location.pathname.startsWith(route)
    );

    useEffect(() => {
        const checkProfile = async () => {
            try {
                setLoading(true);
                console.log("[useProfileCheck] Checking profile...");
                const response = await axiosClient.get("/api/profile");
                console.log("[useProfileCheck] Profile response:", response.data);

                if (response.status === 200 && response.data.user) {
                    const userData = response.data.user;
                    console.log("[useProfileCheck] User data:", userData);
                    setUser(userData);

                    // Check if user is beneficiary and KYC not verified
                    // Only show modal if not on auth pages
                    if (
                        !isAuthPage &&
                        userData.role === "beneficiary" &&
                        !userData.kycVerified
                    ) {
                        console.log("[useProfileCheck] Showing KYC modal");
                        setNeedsKYC(true);
                        setShowKYCModal(true);
                    }
                }
            } catch (error) {
                console.error("[useProfileCheck] Error:", error.response?.status, error.message);
                // If 404 or 401, token is expired or invalid
                if (error.response?.status === 404 || error.response?.status === 401) {
                    console.log("[useProfileCheck] Token expired, redirecting to login");
                    // Only redirect if not already on auth pages
                    if (!isAuthPage) {
                        // Clear any stored auth data
                        localStorage.removeItem("auth_token");
                        localStorage.removeItem("csrfToken");

                        // Redirect to login
                        navigate(LOGIN_ROUTE);
                    }
                } else {
                    console.error("Profile check error:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        // Always check profile, regardless of page
        console.log("[useProfileCheck] Hook mounted, isAuthPage:", isAuthPage);
        checkProfile();
    }, [navigate]);

    const handleKYCModalClose = () => {
        setShowKYCModal(false);
    };

    const handleKYCModalNavigate = () => {
        setShowKYCModal(false);
        navigate(KYC_ROUTE);
    };

    const handleKYCComplete = () => {
        setShowKYCModal(false);
        setNeedsKYC(false);
        // Optionally refresh user data
        checkProfile();
    };

    return {
        user,
        loading,
        showKYCModal,
        needsKYC,
        handleKYCModalClose,
        handleKYCModalNavigate,
        handleKYCComplete,
    };
};

export default useProfileCheck;
