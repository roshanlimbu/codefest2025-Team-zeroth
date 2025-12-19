import { MapPin } from "lucide-react"
import { useDonation } from "../../context/DonationContext"

const CampaignOverview = () => {
  const { disaster, campaign } = useDonation()

  // If no disaster data, show general overview
  if (!disaster) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Campaign Overview</h2>
        <p className="text-sm text-gray-600">
          Category: <span className="font-medium text-gray-900">{campaign.category || "Other"}</span>
        </p>
        <p className="text-sm text-gray-600 mt-2">{campaign.title}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Disaster Overview</h2>

      {/* Image with location */}
      <div className="relative rounded-lg overflow-hidden mb-4">
        <img
          src={disaster.image || "/placeholder.svg"}
          alt={disaster.location || "Disaster Location"}
          className="w-full h-64 object-cover"
        />
        {disaster.location && (
          <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
            <MapPin className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-gray-900">{disaster.location}</span>
          </div>
        )}
      </div>

      {/* Disaster Details */}
      <div className="space-y-3">
        {disaster.type && (
          <div>
            <span className="text-sm font-semibold text-gray-700">Disaster Type: </span>
            <span className="text-sm text-gray-600">{disaster.type}</span>
          </div>
        )}

        {disaster.immediateNeeds?.length > 0 && (
          <div>
            <span className="text-sm font-semibold text-gray-700">Immediate Needs: </span>
            <span className="text-sm text-gray-600">{disaster.immediateNeeds.join(", ")}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default CampaignOverview