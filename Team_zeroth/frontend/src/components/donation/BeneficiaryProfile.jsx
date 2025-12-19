import { useDonation } from "../../context/DonationContext"

const BeneficiaryProfile = () => {
  const { beneficiary } = useDonation()

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Meet {beneficiary.name}</h2>

      <div className="flex items-start gap-4">
        <img
          src={beneficiary.profileImage || "/placeholder.svg"}
          alt={beneficiary.name}
          className="w-20 h-20 rounded-full object-cover flex-shrink-0"
        />

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{beneficiary.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{beneficiary.story}</p>
        </div>
      </div>
    </div>
  )
}

export default BeneficiaryProfile