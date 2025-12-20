import {
  MapPin,
  Heart,
  Users,
  Activity,
  BookOpen,
  Stethoscope,
  Leaf,
  Users as Community,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import axiosClient from '../../api/axiosClient'
import { CAMPAIGN_ROUTE, DONATION_ROUTE } from "../../constant/routes"

// Map category to icon
const categoryIcons = {
  disaster: <Activity className="w-4 h-4" />,
  health: <Stethoscope className="w-4 h-4" />,
  education: <BookOpen className="w-4 h-4" />,
  environment: <Leaf className="w-4 h-4" />,
  community: <Community className="w-4 h-4" />,
  other: <Heart className="w-4 h-4" />,
}

const CampaignCard = ({ campaign }) => {
  const navigate = useNavigate()
  const fundRaised = Number(campaign.fundRaised || 0)
  const fundTarget = Number(campaign.fundTarget || 0) || 1
  const progressPercentage = (fundRaised / fundTarget) * 100
  const category = (campaign.category || "other").toString().toLowerCase()

  return (
    <Link to={`${DONATION_ROUTE}/${campaign.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer group">
        {/* Campaign Image */}
        <div className="relative h-48 overflow-hidden">
          {(() => {
            const hero = campaign.heroImage || (Array.isArray(campaign.media) && campaign.media[0]?.url) || '/placeholder.svg'
            const isRelative = typeof hero === 'string' && hero.startsWith('/')
            const src = isRelative && axiosClient?.defaults?.baseURL ? `${axiosClient.defaults.baseURL}${hero}` : hero
            return (
              <img
                src={src}
                alt={campaign.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )
          })()}

          {/* Category Badge */}
          <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            {categoryIcons[category]}
            <span className="capitalize">{category}</span>
          </div>

          {String(campaign.status).toUpperCase() === 'LIVE' && (
            <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              Live
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-emerald-600">
            {campaign.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <MapPin className="w-4 h-4" />
            {campaign.location || 'Location not specified'}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Users className="w-4 h-4" />
            {campaign.affectedPeople || 0} people affected
          </div>

          {/* Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold">Rs {fundRaised.toLocaleString()}</span>
              <span className="text-gray-500">
                of Rs {fundTarget.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            <div className="text-right text-xs text-gray-500 mt-1">
              {Number.isFinite(progressPercentage) ? progressPercentage.toFixed(1) : '0.0'}% funded
            </div>
          </div>

          {/* Donate Button */}
          <button
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Donate Now
          </button>
        </div>
      </div>
    </Link>
  )
}

export default CampaignCard
