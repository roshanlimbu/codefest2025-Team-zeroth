import { AlertCircle, X } from "lucide-react";

const KYCModal = ({ isOpen, onClose, onNavigateToKYC, isPending = false }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
                >
                    <X size={24} />
                </button>

                {/* Content */}
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                        <AlertCircle className="text-yellow-600" size={32} />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {isPending ? "KYC Verification In Process" : "KYC Verification Required"}
                    </h2>

                    <p className="text-gray-600 mb-6">
                        {isPending
                            ? "We have received your documents. Our team is reviewing them — verification usually completes within 1-3 business days. You will be notified when the status changes."
                            : "To access full beneficiary features and complete donations, please complete your KYC (Know Your Customer) verification. This helps us ensure security and compliance."}
                    </p>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
                        <h3 className="font-semibold text-blue-900 mb-2">What you'll need:</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>✓ A clear photo of yourself</li>
                            <li>✓ Your citizenship card image</li>
                            <li>✓ Citizenship number</li>
                            <li>✓ Valid phone number</li>
                        </ul>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 flex-col sm:flex-row">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                            Close
                        </button>
                        {isPending ? (
                            <button
                                onClick={onNavigateToKYC}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                            >
                                View KYC Status
                            </button>
                        ) : (
                            <button
                                onClick={onNavigateToKYC}
                                className="flex-1 px-4 py-2 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                            >
                                Verify Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KYCModal;
