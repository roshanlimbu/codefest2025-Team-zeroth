import { useState } from "react";
import axiosClient from "../api/axiosClient";

const useKYCSubmit = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [kycStatus, setKycStatus] = useState(null);

    const submitKYC = async (formData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Submit KYC verification
            // Replace '/api/kyc/verify' with your actual backend endpoint
            const response = await axiosClient.post("/api/kyc/verify", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setKycStatus(response.data);
            setSuccess(true);
            return response.data;
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to submit KYC verification";
            setError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const checkKYCStatus = async () => {
        setLoading(true);
        setError(null);

        try {
            // Check KYC verification status
            // Replace '/api/kyc/status' with your actual backend endpoint
            const response = await axiosClient.get("/api/kyc/status");

            setKycStatus(response.data);
            return response.data;
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to fetch KYC status";
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const resetKYC = () => {
        setLoading(false);
        setError(null);
        setSuccess(false);
        setKycStatus(null);
    };

    return {
        submitKYC,
        checkKYCStatus,
        resetKYC,
        loading,
        error,
        success,
        kycStatus,
    };
};

export default useKYCSubmit;
