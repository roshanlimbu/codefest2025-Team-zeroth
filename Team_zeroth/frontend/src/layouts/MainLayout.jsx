import { Outlet } from 'react-router-dom'

import Footer from "../components/Footer"
import KYCModal from "../components/KYC/KYCModal"
import Navbar from "../components/Navbar"
import useProfileCheck from "../hooks/useProfileCheck"

const MainLayout = () => {
    const {
        loading,
        showKYCModal,
        handleKYCModalClose,
        handleKYCModalNavigate,
    } = useProfileCheck();

    return (
        <>
            <Navbar />


            <KYCModal
                isOpen={showKYCModal}
                onClose={handleKYCModalClose}
                onNavigateToKYC={handleKYCModalNavigate}
            />

            <Outlet />
            <Footer />
        </>
    )
}

export default MainLayout
