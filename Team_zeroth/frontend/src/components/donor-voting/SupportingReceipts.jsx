import { useState } from "react"

const SupportingReceipts = ({ receipts }) => {
  const [showAllReceipts, setShowAllReceipts] = useState(false)

  const displayedReceipts = showAllReceipts ? receipts : receipts.slice(0, 2)

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Supporting Receipts</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {displayedReceipts.map((receipt) => (
          <div
            key={receipt.id}
            className="border-2 border-gray-200 rounded-lg p-4 hover:border-orange-300 transition-colors cursor-pointer"
          >
            <img
              src={receipt.imageUrl || "/placeholder.svg"}
              alt={receipt.title}
              className="w-full h-32 object-contain mb-2"
            />
            <p className="text-xs text-gray-600 text-center">{receipt.title}</p>
          </div>
        ))}
      </div>

      {receipts.length > 2 && (
        <button
          onClick={() => setShowAllReceipts(!showAllReceipts)}
          className="w-full py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {showAllReceipts ? "Show Less" : "View All Documents"}
        </button>
      )}
    </div>
  )
}

export default SupportingReceipts