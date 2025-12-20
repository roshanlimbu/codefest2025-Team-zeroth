
import { Check, Clock, Circle } from "lucide-react"
import { useDonation } from "../../context/DonationContext"

const MilestoneProgressSection = () => {
  const { campaign, milestones, fundingProgress } = useDonation()

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <Check className="w-5 h-5 text-white" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-white" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-orange-500"
      case "in-progress":
        return "bg-orange-500"
      default:
        return "bg-gray-300"
    }
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Milestone Progress</h2>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Funding Progress</span>
          <span className="text-sm font-bold text-gray-900">{fundingProgress.toFixed(1)}%</span>
        </div>

        <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
          <span>
            Target: {campaign.currency}
            {campaign.totalTarget.toLocaleString()}
          </span>
          <span>
            Raised: {campaign.currency}
            {campaign.totalRaised.toLocaleString()}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-700 to-emerald-800 h-full rounded-full transition-all duration-500"
            style={{ width: `${fundingProgress}%` }}
          />
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Milestones</h3>

        {milestones.map((milestone) => (
          <div key={milestone.id} className="flex gap-4">
            {/* Icon */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusColor(milestone.status)}`}
            >
              {getStatusIcon(milestone.status)}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">{milestone.title}</h4>
              <div className="text-sm text-gray-600">
                Target: {campaign.currency}
                {milestone.target.toLocaleString()} / Achieved: {campaign.currency}
                {milestone.achieved.toLocaleString()}
              </div>

              {/* Progress bar for in-progress milestones */}
              {milestone.status === "in-progress" && (
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-700 h-full rounded-full transition-all duration-500"
                    style={{ width: `${milestone.target && milestone.target > 0 ? Math.min(100, (milestone.achieved / milestone.target) * 100) : (milestone.achieved > 0 ? 100 : 0)}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MilestoneProgressSection