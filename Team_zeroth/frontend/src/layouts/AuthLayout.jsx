import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import KYCModal from "../components/KYC/KYCModal"
import useProfileCheck from "../hooks/useProfileCheck"

const AuthLayout = () => {
  const {
    loading,
    showKYCModal,
    kycPending,
    handleKYCModalClose,
    handleKYCModalNavigate,
  } = useProfileCheck();

  return (
    <div>
        <Navbar />

        <KYCModal
          isOpen={showKYCModal}
          isPending={kycPending}
          onClose={handleKYCModalClose}
          onNavigateToKYC={handleKYCModalNavigate}
        />

        <Outlet />
    </div>
  )
}

export default AuthLayout