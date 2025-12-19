const ReviewSubmit = ({ totalCost, errors }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
          <p className="text-gray-600 text-sm">
            Final review of your project details and total budget before submission for donor consideration.
          </p>
        </div>

        <div className="flex justify-between items-center py-4 border-t border-b border-gray-200">
          <span className="font-semibold text-gray-900">Total Estimated Project Cost:</span>
          <span className={`text-2xl font-bold ${errors.totalCost ? "text-red-500" : "text-gray-900"}`}>
            Rs. {totalCost.toLocaleString()}
          </span>
        </div>
        {errors.totalCost && <p className="text-red-500 text-xs">{errors.totalCost}</p>}

        <p className="text-sm text-gray-600">
          By submitting, you agree to "We Raise It"'s Terms of Service and commit to transparent milestone verification.
        </p>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Submit Project for Review
        </button>
      </div>
    </div>
  )
}

export default ReviewSubmit
