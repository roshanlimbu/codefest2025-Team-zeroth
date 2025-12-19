import { Heart } from "lucide-react"
import { useDonation } from "../../context/DonationContext"

const DonationForm = () => {
  const {
    campaign,
    selectedAmount,
    setSelectedAmount,
    customAmount,
    setCustomAmount,
    isAnonymous,
    setIsAnonymous,
    donationOptions,
    handleDonation,
  } = useDonation()

  const currentImpact =
    donationOptions.find((opt) => opt.amount === (customAmount ? Number.parseInt(customAmount) : selectedAmount))
      ?.impact || `Your Rs.${customAmount || selectedAmount} donation will make a difference.`

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-6">
      {/* Status Badges */}
      <div className="flex flex-col gap-2 mb-6">
        {campaign.aiApproved && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium w-fit">
            <span className="w-2 h-2 bg-orange-500 rounded-full" />
            AI Approved
          </div>
        )}
        {campaign.secureBlockchain && (
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Secure Blockchain Transactions
          </div>
        )}
      </div>

      {/* Support Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Support This Campaign</h2>
      <p className="text-gray-600 text-sm mb-6">Every contribution brings hope and tangible relief.</p>

      {/* Donation Amount */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">Donation Amount:</label>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl font-bold text-orange-500">
            {campaign.currency} {customAmount || selectedAmount}
          </span>
        </div>

        {/* Preset Amounts */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {donationOptions.map((option) => (
            <button
              key={option.amount}
              onClick={() => {
                setSelectedAmount(option.amount)
                setCustomAmount("")
              }}
              className={`py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
                selectedAmount === option.amount && !customAmount
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Rs {option.amount}
            </button>
          ))}
        </div>

        {/* Custom Amount Input */}
        <input
          type="number"
          placeholder="Enter custom amount"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />

        {/* Impact Message */}
        <p className="text-orange-600 text-sm mt-3 font-medium">{currentImpact}</p>
      </div>

      {/* Anonymous Toggle */}
      <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
        <label htmlFor="anonymous" className="text-sm font-medium text-gray-700 cursor-pointer">
          Donate Anonymously
        </label>
        <button
          id="anonymous"
          role="switch"
          aria-checked={isAnonymous}
          onClick={() => setIsAnonymous(!isAnonymous)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isAnonymous ? "bg-orange-500" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isAnonymous ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Donate Button */}
      <button
        onClick={handleDonation}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Heart className="w-5 h-5" />
        Donate Now
      </button>
    </div>
  )
}

export default DonationForm