import React, { useState } from "react";
import { CheckCircle, Camera, FileText, Hash, Phone, AlertCircle, Check, X } from "lucide-react";

const KYCVerification = ({ onVerificationComplete }) => {
    const [currentStep, setCurrentStep] = useState("intro");
    const [kycData, setKycData] = useState({
        photo: null,
        citizenshipCard: null,
        citizenshipNumber: "",
        phoneNumber: "",
    });
    const [photoPreview, setPhotoPreview] = useState(null);
    const [citizenshipPreview, setCitizenshipPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const steps = ["photo", "citizenship", "number", "phone", "review"];
    const stepIndex = steps.indexOf(currentStep);
    const progress = currentStep === "intro" ? 0 : ((stepIndex + 1) / steps.length) * 100;

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^[9][6-8]\d{8}$/;
        return phoneRegex.test(phone);
    };

    const handlePhotoCapture = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors({ ...errors, photo: "Please upload a valid image file" });
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setErrors({ ...errors, photo: "File size must be less than 5MB" });
                return;
            }
            setKycData({ ...kycData, photo: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
                setErrors({ ...errors, photo: "" });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCitizenshipUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setErrors({ ...errors, citizenship: "Please upload a valid image file" });
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                setErrors({ ...errors, citizenship: "File size must be less than 10MB" });
                return;
            }
            setKycData({ ...kycData, citizenshipCard: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setCitizenshipPreview(reader.result);
                setErrors({ ...errors, citizenship: "" });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCitizenshipNumberChange = (e) => {
        const value = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, '');
        setKycData({ ...kycData, citizenshipNumber: value });
        if (value.trim()) {
            setErrors({ ...errors, citizenshipNumber: "" });
        }
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 10);
        setKycData({ ...kycData, phoneNumber: value });
        if (validatePhoneNumber(value)) {
            setErrors({ ...errors, phoneNumber: "" });
        }
    };

    const handlePhotoNext = () => {
        if (!kycData.photo) {
            setErrors({ ...errors, photo: "Please capture or upload a photo" });
            return;
        }
        setCurrentStep("citizenship");
    };

    const handleCitizenshipNext = () => {
        if (!kycData.citizenshipCard) {
            setErrors({ ...errors, citizenship: "Please upload your citizenship card" });
            return;
        }
        setCurrentStep("number");
    };

    const handleNumberNext = () => {
        if (!kycData.citizenshipNumber.trim()) {
            setErrors({ ...errors, citizenshipNumber: "Please enter your citizenship number" });
            return;
        }
        if (kycData.citizenshipNumber.length < 5) {
            setErrors({ ...errors, citizenshipNumber: "Please enter a valid citizenship number" });
            return;
        }
        setCurrentStep("phone");
    };

    const handlePhoneNext = () => {
        if (!kycData.phoneNumber.trim()) {
            setErrors({ ...errors, phoneNumber: "Please enter your phone number" });
            return;
        }
        if (!validatePhoneNumber(kycData.phoneNumber)) {
            setErrors({ ...errors, phoneNumber: "Please enter a valid Nepali phone number (starting with 96, 97, or 98)" });
            return;
        }
        setCurrentStep("review");
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("photo", kycData.photo);
        formData.append("citizenshipCard", kycData.citizenshipCard);
        formData.append("citizenshipNumber", kycData.citizenshipNumber);
        formData.append("phoneNumber", kycData.phoneNumber);

        // Simulate API call
        setTimeout(() => {
            if (onVerificationComplete) {
                onVerificationComplete(formData);
            }
            setIsSubmitting(false);
        }, 1500);
    };

    const handleBack = () => {
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        } else if (currentStep === "intro") {
            return;
        } else {
            setCurrentStep("intro");
        }
    };

    const StepIndicator = ({ step, label, icon: Icon, isActive, isCompleted }) => (
        <div className="flex flex-col items-center relative">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-green-600 text-white shadow-lg scale-110' :
                        'bg-gray-200 text-gray-400'
                }`}>
                {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
            </div>
            <span className={`mt-2 text-xs font-medium ${isActive ? 'text-green-600' : isCompleted ? 'text-green-500' : 'text-gray-400'
                }`}>
                {label}
            </span>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8 pt-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">KYC Verification</h1>
                    <p className="text-gray-600">Complete your identity verification to create campaigns</p>
                </div>

                {/* Progress Bar */}
                {currentStep !== "intro" && (
                    <div className="mb-8">
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
                            <div
                                className="bg-green-600 h-2 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="flex justify-between items-start max-w-2xl mx-auto mb-8">
                            <StepIndicator
                                step="photo"
                                label="Photo"
                                icon={Camera}
                                isActive={currentStep === "photo"}
                                isCompleted={steps.indexOf(currentStep) > 0}
                            />
                            <div className="flex-1 h-0.5 bg-gray-200 mt-6 mx-2">
                                <div className={`h-full bg-green-500 transition-all duration-300 ${steps.indexOf(currentStep) > 0 ? 'w-full' : 'w-0'
                                    }`} />
                            </div>

                            <StepIndicator
                                step="citizenship"
                                label="ID Card"
                                icon={FileText}
                                isActive={currentStep === "citizenship"}
                                isCompleted={steps.indexOf(currentStep) > 1}
                            />
                            <div className="flex-1 h-0.5 bg-gray-200 mt-6 mx-2">
                                <div className={`h-full bg-green-500 transition-all duration-300 ${steps.indexOf(currentStep) > 1 ? 'w-full' : 'w-0'
                                    }`} />
                            </div>

                            <StepIndicator
                                step="number"
                                label="ID Number"
                                icon={Hash}
                                isActive={currentStep === "number"}
                                isCompleted={steps.indexOf(currentStep) > 2}
                            />
                            <div className="flex-1 h-0.5 bg-gray-200 mt-6 mx-2">
                                <div className={`h-full bg-green-500 transition-all duration-300 ${steps.indexOf(currentStep) > 2 ? 'w-full' : 'w-0'
                                    }`} />
                            </div>

                            <StepIndicator
                                step="phone"
                                label="Phone"
                                icon={Phone}
                                isActive={currentStep === "phone"}
                                isCompleted={steps.indexOf(currentStep) > 3}
                            />
                            <div className="flex-1 h-0.5 bg-gray-200 mt-6 mx-2">
                                <div className={`h-full bg-green-500 transition-all duration-300 ${steps.indexOf(currentStep) > 3 ? 'w-full' : 'w-0'
                                    }`} />
                            </div>

                            <StepIndicator
                                step="review"
                                label="Review"
                                icon={CheckCircle}
                                isActive={currentStep === "review"}
                                isCompleted={false}
                            />
                        </div>
                    </div>
                )}

                {/* Main Content Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
                    {/* Intro Step */}
                    {currentStep === "intro" && (
                        <div className="text-center max-w-2xl mx-auto">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verify Your Identity</h2>
                            <p className="text-gray-600 mb-8">
                                To create and manage campaigns, we need to verify your identity. This is a quick,
                                secure process that takes just a few minutes.
                            </p>

                            <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
                                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                    <AlertCircle className="w-5 h-5 mr-2 text-blue-600" />
                                    What you'll need:
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">A clear photo of yourself with good lighting</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">Your citizenship card (front or back)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">Your citizenship number</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">Your active phone number</span>
                                    </li>
                                </ul>
                            </div>

                            <button
                                onClick={() => setCurrentStep("photo")}
                                className="bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
                            >
                                Start Verification
                            </button>
                        </div>
                    )}

                    {/* Photo Step */}
                    {currentStep === "photo" && (
                        <div className="max-w-xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Take Your Photo</h2>
                            <p className="text-gray-600 mb-6">
                                Please take a clear photo of yourself. Make sure your face is clearly visible and well-lit.
                            </p>

                            <div className="mb-6">
                                <label className="block">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        capture="user"
                                        onChange={handlePhotoCapture}
                                        className="hidden"
                                        id="photo-input"
                                    />
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 transition-colors bg-gray-50 hover:bg-green-50">
                                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-700 font-medium mb-1">Click to take or upload photo</p>
                                        <p className="text-sm text-gray-500">Maximum file size: 5MB</p>
                                    </div>
                                </label>
                            </div>

                            {photoPreview && (
                                <div className="mb-6 bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm font-medium text-gray-700 mb-3">Preview:</p>
                                    <div className="relative inline-block">
                                        <img
                                            src={photoPreview}
                                            alt="Preview"
                                            className="max-w-full h-64 object-cover rounded-lg shadow-md"
                                        />
                                        <div className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full">
                                            <Check className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {errors.photo && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                                    <span className="text-sm">{errors.photo}</span>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    onClick={handleBack}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handlePhotoNext}
                                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Citizenship Card Step */}
                    {currentStep === "citizenship" && (
                        <div className="max-w-xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Citizenship Card</h2>
                            <p className="text-gray-600 mb-6">
                                Please upload a clear image of your citizenship card. Either front or back side is acceptable.
                            </p>

                            <div className="mb-6">
                                <label className="block">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleCitizenshipUpload}
                                        className="hidden"
                                        id="citizenship-input"
                                    />
                                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-500 transition-colors bg-gray-50 hover:bg-green-50">
                                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-700 font-medium mb-1">Click to upload citizenship card</p>
                                        <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
                                    </div>
                                </label>
                            </div>

                            {citizenshipPreview && (
                                <div className="mb-6 bg-gray-50 rounded-xl p-4">
                                    <p className="text-sm font-medium text-gray-700 mb-3">Preview:</p>
                                    <div className="relative inline-block">
                                        <img
                                            src={citizenshipPreview}
                                            alt="Citizenship Preview"
                                            className="max-w-full h-64 object-cover rounded-lg shadow-md"
                                        />
                                        <div className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full">
                                            <Check className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {errors.citizenship && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                                    <span className="text-sm">{errors.citizenship}</span>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    onClick={handleBack}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleCitizenshipNext}
                                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Citizenship Number Step */}
                    {currentStep === "number" && (
                        <div className="max-w-xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Citizenship Number</h2>
                            <p className="text-gray-600 mb-6">
                                Enter your citizenship number exactly as it appears on your citizenship card.
                            </p>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Citizenship Number
                                </label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        value={kycData.citizenshipNumber}
                                        onChange={handleCitizenshipNumberChange}
                                        placeholder="e.g., 123-456-789"
                                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    />
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    The format may vary. Enter your number as it appears on your card.
                                </p>
                            </div>

                            {errors.citizenshipNumber && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                                    <span className="text-sm">{errors.citizenshipNumber}</span>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    onClick={handleBack}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleNumberNext}
                                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Phone Number Step */}
                    {currentStep === "phone" && (
                        <div className="max-w-xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Phone Number</h2>
                            <p className="text-gray-600 mb-6">
                                Please provide your active phone number. We may use this to verify your identity.
                            </p>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="tel"
                                        value={kycData.phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        placeholder="98XXXXXXXX"
                                        maxLength="10"
                                        className="w-full pl-11 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                                    />
                                    {kycData.phoneNumber && validatePhoneNumber(kycData.phoneNumber) && (
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                            <Check className="w-5 h-5 text-green-500" />
                                        </div>
                                    )}
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    Enter a valid Nepali mobile number (starting with 96, 97, or 98)
                                </p>
                            </div>

                            {errors.phoneNumber && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                                    <span className="text-sm">{errors.phoneNumber}</span>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    onClick={handleBack}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handlePhoneNext}
                                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
                                >
                                    Review
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Review Step */}
                    {currentStep === "review" && (
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Information</h2>
                            <p className="text-gray-600 mb-8">
                                Please review all your information carefully before submitting.
                            </p>

                            <div className="space-y-6">
                                {/* Photo Review */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            <Camera className="w-5 h-5 text-green-600 mr-2" />
                                            <h3 className="font-semibold text-gray-900">Your Photo</h3>
                                        </div>
                                        <Check className="w-5 h-5 text-green-600" />
                                    </div>
                                    {photoPreview && (
                                        <img
                                            src={photoPreview}
                                            alt="Your photo"
                                            className="w-full h-48 object-cover rounded-lg shadow-sm mb-3"
                                        />
                                    )}
                                    <button
                                        onClick={() => setCurrentStep("photo")}
                                        className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center"
                                    >
                                        Change Photo →
                                    </button>
                                </div>

                                {/* Citizenship Card Review */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            <FileText className="w-5 h-5 text-green-600 mr-2" />
                                            <h3 className="font-semibold text-gray-900">Citizenship Card</h3>
                                        </div>
                                        <Check className="w-5 h-5 text-green-600" />
                                    </div>
                                    {citizenshipPreview && (
                                        <img
                                            src={citizenshipPreview}
                                            alt="Citizenship card"
                                            className="w-full h-48 object-cover rounded-lg shadow-sm mb-3"
                                        />
                                    )}
                                    <button
                                        onClick={() => setCurrentStep("citizenship")}
                                        className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center"
                                    >
                                        Change Card →
                                    </button>
                                </div>

                                {/* Citizenship Number Review */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            <Hash className="w-5 h-5 text-green-600 mr-2" />
                                            <h3 className="font-semibold text-gray-900">Citizenship Number</h3>
                                        </div>
                                        <Check className="w-5 h-5 text-green-600" />
                                    </div>
                                    <p className="text-gray-900 font-mono text-lg mb-3">{kycData.citizenshipNumber}</p>
                                    <button
                                        onClick={() => setCurrentStep("number")}
                                        className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center"
                                    >
                                        Change Number →
                                    </button>
                                </div>

                                {/* Phone Number Review */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center">
                                            <Phone className="w-5 h-5 text-green-600 mr-2" />
                                            <h3 className="font-semibold text-gray-900">Phone Number</h3>
                                        </div>
                                        <Check className="w-5 h-5 text-green-600" />
                                    </div>
                                    <p className="text-gray-900 font-mono text-lg mb-3">{kycData.phoneNumber}</p>
                                    <button
                                        onClick={() => setCurrentStep("phone")}
                                        className="text-green-600 hover:text-green-700 font-semibold text-sm flex items-center"
                                    >
                                        Change Number →
                                    </button>
                                </div>
                            </div>

                            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                                <p className="text-sm text-blue-800 flex items-start">
                                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                                    <span>
                                        Your information will be securely stored and verified by our team.
                                        This verification process may take up to 24 hours. You'll be notified once approved.
                                    </span>
                                </p>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={handleBack}
                                    disabled={isSubmitting}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Verification'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Privacy Notice */}
                <div className="text-center text-sm text-gray-500 pb-8">
                    <div className="flex items-center justify-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Your data is encrypted and secure. We comply with all privacy regulations.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KYCVerification;
