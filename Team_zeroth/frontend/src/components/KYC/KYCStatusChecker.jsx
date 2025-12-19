import React, { useEffect } from "react";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import useKYCSubmit from "../../hooks/useKYCSubmit";

const KYCStatusChecker = () => {
    const { checkKYCStatus, loading, error, kycStatus } = useKYCSubmit();

    useEffect(() => {
        checkKYCStatus();
    }, []);

    if (loading) {
        return (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    <p className="text-gray-700">Checking KYC status...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-md mx-auto p-6 bg-red-50 border-l-4 border-red-600 rounded-lg">
                <div className="flex items-start space-x-3">
                    <AlertCircle className="text-red-600 mt-1" size={24} />
                    <div>
                        <h3 className="font-semibold text-red-900">Error</h3>
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!kycStatus) {
        return (
            <div className="max-w-md mx-auto p-6 bg-gray-50 border-l-4 border-gray-400 rounded-lg">
                <p className="text-gray-700">No KYC verification found.</p>
            </div>
        );
    }

    const getStatusDisplay = () => {
        switch (kycStatus.status) {
            case "approved":
                return {
                    icon: <CheckCircle className="text-green-600" size={32} />,
                    title: "KYC Approved",
                    description: "Your identity has been verified successfully.",
                    bgColor: "bg-green-50",
                    borderColor: "border-green-600",
                    textColor: "text-green-900",
                    badgeColor: "bg-green-100 text-green-800",
                };
            case "rejected":
                return {
                    icon: <XCircle className="text-red-600" size={32} />,
                    title: "KYC Rejected",
                    description: "Your verification was not approved. Please resubmit.",
                    bgColor: "bg-red-50",
                    borderColor: "border-red-600",
                    textColor: "text-red-900",
                    badgeColor: "bg-red-100 text-red-800",
                };
            case "pending":
            default:
                return {
                    icon: <Clock className="text-yellow-600" size={32} />,
                    title: "KYC Pending",
                    description: "Your verification is being processed. This may take up to 24 hours.",
                    bgColor: "bg-yellow-50",
                    borderColor: "border-yellow-600",
                    textColor: "text-yellow-900",
                    badgeColor: "bg-yellow-100 text-yellow-800",
                };
        }
    };

    const status = getStatusDisplay();

    return (
        <div className={`max-w-md mx-auto p-6 ${status.bgColor} border-l-4 ${status.borderColor} rounded-lg shadow-md`}>
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    {status.icon}
                </div>
                <div className="flex-grow">
                    <h3 className={`font-bold text-lg ${status.textColor}`}>
                        {status.title}
                    </h3>
                    <p className={`text-sm ${status.textColor} opacity-90 mt-1`}>
                        {status.description}
                    </p>

                    {/* Status Badge */}
                    <div className="mt-4">
                        <span className={`inline-block ${status.badgeColor} px-3 py-1 rounded-full text-xs font-semibold`}>
                            {kycStatus.status.toUpperCase()}
                        </span>
                    </div>

                    {/* Dates */}
                    <div className="mt-4 text-sm space-y-1">
                        {kycStatus.submittedAt && (
                            <p className={`${status.textColor} opacity-75`}>
                                <span className="font-semibold">Submitted:</span>{" "}
                                {new Date(kycStatus.submittedAt).toLocaleDateString()}
                            </p>
                        )}
                        {kycStatus.verifiedAt && (
                            <p className={`${status.textColor} opacity-75`}>
                                <span className="font-semibold">Verified:</span>{" "}
                                {new Date(kycStatus.verifiedAt).toLocaleDateString()}
                            </p>
                        )}
                    </div>

                    {/* Action for rejected */}
                    {kycStatus.status === "rejected" && (
                        <button className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200">
                            Resubmit Verification
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KYCStatusChecker;
