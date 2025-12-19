import { useState } from "react"

import { milestoneHistory, milestones, milestoneVerificationSummary } from "../data/milestones"
import { validateFile, validateVerificationData } from "../utils/validation"
import MilestoneProgress from "../components/milestone-verification/MilestoneProgress"
import UploadSection from "../components/milestone-verification/UploadSection"
import VerificationSummary from "../components/milestone-verification/VerificationSummary"
import MilestoneHistory from "../components/milestone-verification/MilestoneHistory"
import ReceiptPreview from "../components/milestone-verification/ReceiptPreview"

const MilestoneVerification = () => {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [validationErrors, setValidationErrors] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleFileUpload = (file) => {
    const validation = validateFile(file)

    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      return
    }

    setValidationErrors([])
    setUploadedFile(file)
  }

  const handleSubmit = () => {
    if (!uploadedFile) {
      setValidationErrors(["Please upload a file before submitting"])
      return
    }

    const verificationData = {
      verificationSummary: milestoneVerificationSummary
    };

    const dataValidation = validateVerificationData(verificationData);
    console.log(dataValidation);

    if (!dataValidation.isValid) {
      setValidationErrors(dataValidation.errors)
      return
    }

    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      alert("Verification submitted successfully!")
      setIsSubmitting(false)
    }, 1500)
  }

  const handleCancel = () => {
    setUploadedFile(null)
    setValidationErrors([])
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Milestone Verification</h1>
            <p className="text-gray-600 text-lg">
              Upload proof for your completed milestone to get it verified and approved for fund release.
            </p>
          </div>

          {validationErrors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-red-800 font-semibold mb-2">Validation Errors:</h3>
              <ul className="list-disc list-inside space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index} className="text-red-700 text-sm">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* <div className="mb-8">
            <MilestoneProgress milestones={milestones.milestones} />
          </div> */}

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div className="space-y-8">
              <UploadSection onFileUpload={handleFileUpload} uploadedFile={uploadedFile} />
              <ReceiptPreview file={uploadedFile} />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <VerificationSummary data={milestoneVerificationSummary} />
              <MilestoneHistory milestones={milestoneHistory.milestoneHistory} />
              {/* <CommunityConsensus data={verificationData.communityConsensus} /> */}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !uploadedFile}
              className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Verification"}
            </button>
          </div>
          <div className="mb-8">
            <MilestoneProgress milestones={milestones.milestones} />
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  )
}

export default MilestoneVerification