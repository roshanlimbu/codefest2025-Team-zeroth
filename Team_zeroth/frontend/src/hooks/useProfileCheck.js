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

    // Check if we're on a public page where KYC modal shouldn't show
    const isPublicPage = location.pathname === '/' || 
                        location.pathname.startsWith('/donation/') ||
                        location.pathname === '/how-it-works' ||
                        location.pathname === '/transparency' ||
                        location.pathname === '/about' ||
                        location.pathname === '/contact';

    // make checkProfile callable from other handlers
    const checkProfile = async () => {
        try {
            setLoading(true);
            const response = await axiosClient.get("/api/profile");
            if (response.status === 200 && response.data.user) {
                const userData = response.data.user;
                setUser(userData);

                // Only show modal if not on auth pages AND not on public pages
                // and user is a beneficiary-style USER who hasn't submitted or been verified
                const shouldShowKYC = !isAuthPage && !isPublicPage && userData.type === "USER" && !userData.kycVerified && !userData.kycSubmittedAt;
                if (shouldShowKYC) {
                    setNeedsKYC(true);
                    setShowKYCModal(true);
                } else {
                    setNeedsKYC(false);
                    setShowKYCModal(false);
                }
            }
        } catch (error) {
            // If 404 or 401, token is expired or invalid
            if (error.response?.status === 404 || error.response?.status === 401) {
                localStorage.removeItem("auth_token");
                localStorage.removeItem("csrfToken");
                setUser(null);
            } else {
                console.error("Profile check error:", error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Always check profile on mount / when path changes
        checkProfile();
    }, [navigate, isAuthPage, location.pathname]);

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
        // refresh profile to pick up kycSubmittedAt / kycVerified changes
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
