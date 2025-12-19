import React from 'react'
import { Outlet } from 'react-router-dom'
import KYCModal from "../components/KYC/KYCModal"
import useProfileCheck from "../hooks/useProfileCheck"

const UnAuthLayout = () => {
    const {
        showKYCModal,
        handleKYCModalClose,
        handleKYCModalNavigate,
    } = useProfileCheck();

    return (
        <div>
            <KYCModal
                isOpen={showKYCModal}
                onClose={handleKYCModalClose}
                onNavigateToKYC={handleKYCModalNavigate}
            />
            <Outlet />
        </div>
    )
}

export default UnAuthLayout
