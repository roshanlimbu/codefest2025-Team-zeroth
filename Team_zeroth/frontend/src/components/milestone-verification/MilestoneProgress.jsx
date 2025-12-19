import { Lock, CheckCircle, TrendingUp } from "lucide-react"

const MilestoneProgress = ({ milestones }) => {
  const milestoneList = milestones || []

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const getProgressPercentage = (achieved, target) => {
    return Math.min((achieved / target) * 100, 100)
  }

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Campaign Milestones</h2>

      {milestoneList.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No milestones available</p>
      ) : (
        <div className="space-y-6">
          {milestoneList.map((milestone) => {
            const progress = getProgressPercentage(milestone.achievedAmount, milestone.target)
            const isFullyFunded = milestone.achievedAmount >= milestone.target

            return (
              <div
                key={milestone.id}
                className={`border rounded-lg p-4 ${milestone.isLocked ? "bg-gray-50 border-gray-200" : "border-gray-200"}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{milestone.name}</h3>
                      {milestone.isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                      {milestone.isCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
                    </div>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      <TrendingUp className="w-4 h-4 inline mr-1" />
                      Progress
                    </span>
                    <span className="font-semibold text-gray-900">
                      {formatAmount(milestone.achievedAmount)} / {formatAmount(milestone.target)}
                    </span>
                  </div>

                  <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isFullyFunded ? "bg-green-500" : milestone.isLocked ? "bg-gray-400" : "bg-orange-500"
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{progress.toFixed(1)}% funded</span>
                    {milestone.isCompleted && <span className="text-green-600 font-medium">Completed</span>}
                    {milestone.isLocked && !milestone.isCompleted && (
                      <span className="text-gray-500 font-medium">Locked</span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default MilestoneProgress