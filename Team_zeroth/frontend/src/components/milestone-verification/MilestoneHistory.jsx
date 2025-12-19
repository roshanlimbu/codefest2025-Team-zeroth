const MilestoneHistory = ({ milestones }) => {
  const milestoneList = milestones || []

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500"
      case "pending":
        return "bg-orange-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium capitalize"
    switch (status) {
      case "approved":
        return `${baseClasses} bg-orange-100 text-orange-700`
      case "pending":
        return `${baseClasses} bg-orange-50 text-orange-600 border border-orange-300`
      case "rejected":
        return `${baseClasses} bg-red-100 text-red-700`
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`
    }
  }

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Milestone History</h2>

      {milestoneList.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No milestones found</p>
      ) : (
        <div className="space-y-4">
          {milestoneList.map((milestone, index) => (
            <div key={milestone.id} className="flex items-start gap-3">
              {/* Status Indicator */}
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(milestone.status)} mt-1`} />
                {index < milestoneList.length - 1 && <div className="w-0.5 h-12 bg-gray-200 my-1" />}
              </div>

              {/* Content */}
              <div className="flex-1 pb-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{milestone.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{milestone.date}</p>
                  </div>
                  <span className={getStatusBadge(milestone.status)}>{milestone.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MilestoneHistory