import { CheckCircle, AlertTriangle } from "lucide-react"

const VerificationSummary = ({ data }) => {
  const aiScore = data?.aiAccuracyScore || 0
  const fraudRisk = data?.fraudDetectionRisk || 0
  const isVerified = data?.geoLocationVerified || false

  const showAccuracyWarning = aiScore < 70
  const showFraudWarning = fraudRisk > 30

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Verification Summary</h2>

      <div className="space-y-6">
        {/* AI Accuracy Score */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">AI Accuracy Score</span>
              {showAccuracyWarning && (
                <AlertTriangle className="w-4 h-4 text-yellow-600" title="Score below threshold" />
              )}
            </div>
            <span className={`font-bold ${showAccuracyWarning ? "text-yellow-600" : "text-orange-500"}`}>
              {aiScore}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${showAccuracyWarning ? "bg-yellow-500" : "bg-orange-500"}`}
              style={{ width: `${aiScore}%` }}
            />
          </div>
        </div>

        {/* Fraud Detection Risk */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium">Fraud Detection Risk</span>
              {showFraudWarning && <AlertTriangle className="w-4 h-4 text-red-600" title="Risk above threshold" />}
            </div>
            <span className="text-red-500 font-bold">{fraudRisk}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${showFraudWarning ? "bg-red-600" : "bg-red-500"}`}
              style={{ width: `${fraudRisk}%` }}
            />
          </div>
        </div>

        {/* Geo-location Verified */}
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium">Geo-location Verified</span>
          {isVerified ? (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
              <CheckCircle className="w-4 h-4" />
              Verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              <AlertTriangle className="w-4 h-4" />
              Not Verified
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerificationSummary