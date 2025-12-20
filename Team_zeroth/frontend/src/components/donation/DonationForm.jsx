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
    donationMessage,
    setDonationMessage,
    handleDonation,
  } = useDonation()

  const isLoggedIn = Boolean(localStorage.getItem('auth_token') || localStorage.getItem('csrfToken'))

  const currentImpact =
    donationOptions.find((opt) => opt.amount === (customAmount ? Number.parseInt(customAmount) : selectedAmount))
      ?.impact || `Your Rs.${customAmount || selectedAmount} donation will make a difference.`

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 sticky top-6">
      {/* Status badges removed per design */}

      {/* Support Section */}
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Support This Campaign</h2>
      <p className="text-gray-600 text-sm mb-6">Every contribution brings hope and tangible relief.</p>

      {/* Donation Amount */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">Donation Amount:</label>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-3xl font-bold text-emerald-800">
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
                  ? "bg-emerald-800 text-white"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />

        {/* Impact Message */}
        <p className="text-emerald-800 text-sm mt-3 font-medium">{currentImpact}</p>
      </div>

      {/* Message Input (required) */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-2">Message (required)</label>
        <textarea
          placeholder="Write a short message or dedication"
          value={donationMessage}
          onChange={(e) => setDonationMessage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          rows={3}
        />
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
            isAnonymous ? "bg-emerald-800" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isAnonymous ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {!isAnonymous && !isLoggedIn && (
        <div className="mb-4 text-sm text-emerald-700 bg-yellow-50 border border-yellow-100 p-3 rounded">
          You must be logged in for your name to appear with this donation.
        </div>
      )}

      {/* Donate Button */}
      <button
        onClick={() => {
          if (!donationMessage || !donationMessage.trim()) {
            alert('Please enter a message before donating.')
            return
          }
          handleDonation()
        }}
        className={`w-full bg-emerald-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${(!donationMessage || !donationMessage.trim()) ? 'opacity-100 cursor-not-allowed' : ''}`}
        disabled={!donationMessage || !donationMessage.trim()}
      >
        <Heart className="w-5 h-5" />
        Donate Now
      </button>
    </div>
  )
}

export default DonationForm