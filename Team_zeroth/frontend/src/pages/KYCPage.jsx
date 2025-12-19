import React, { useState } from "react";
import KYCVerification from "../components/KYC/KYCVerification";
import { useNavigate } from "react-router-dom";
import useKYCSubmit from "../hooks/useKYCSubmit";

const KYCPage = () => {
    const navigate = useNavigate();
    const { submitKYC, loading, error, success } = useKYCSubmit();
    const [localError, setLocalError] = useState("");

    const handleVerificationComplete = async (formData) => {
        try {
            const result = await submitKYC(formData);

            // Show success message
            setTimeout(() => {
                navigate("/campaign/create");
            }, 2000);
        } catch (err) {
            setLocalError(err.message || "Failed to submit KYC verification");
        }
    };

    return (
        <div>
            {success && (
                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
                    ✓ KYC verification submitted successfully!
                </div>
            )}

            {(error || localError) && (
                <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
                    ✗ {error || localError}
                </div>
            )}

            {loading && (
                <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-40">
                    <div className="bg-white rounded-lg p-6">
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                            <p className="text-gray-700 font-semibold">Submitting your verification...</p>
                        </div>
                    </div>
                </div>
            )}

            <KYCVerification onVerificationComplete={handleVerificationComplete} />
        </div>
    );
};

export default KYCPage;
