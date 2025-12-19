const MilestoneBuilder = ({
  milestones,
  errors,
  handleMilestoneChange,
  addMilestone,
  removeMilestone,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Milestone Builder
          </h2>
          <p className="text-gray-600 text-sm">
            Define clear, measurable milestones for your project with estimated
            costs and target dates.
          </p>
        </div>

        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-gray-900">
                Milestone {index + 1}
              </h3>

              {milestones.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMilestone(index)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Milestone Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={milestone.title}
                onChange={(e) =>
                  handleMilestoneChange(index, "title", e.target.value)
                }
                placeholder="Enter milestone title"
                className={`w-full px-3 py-2 border ${
                  errors[`milestone_${index}_title`]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
              />
              {errors[`milestone_${index}_title`] && (
                <p className="text-red-500 text-xs">
                  {errors[`milestone_${index}_title`]}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={milestone.description}
                onChange={(e) =>
                  handleMilestoneChange(index, "description", e.target.value)
                }
                placeholder="Describe this milestone"
                rows={3}
                className={`w-full px-3 py-2 border ${
                  errors[`milestone_${index}_description`]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none`}
              />
              {errors[`milestone_${index}_description`] && (
                <p className="text-red-500 text-xs">
                  {errors[`milestone_${index}_description`]}
                </p>
              )}
            </div>

            {/* Date & Cost */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Target Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={milestone.targetDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    handleMilestoneChange(index, "targetDate", e.target.value)
                  }
                  className={`w-full px-3 py-2 border ${
                    errors[`milestone_${index}_date`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Estimated Cost <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 text-sm">
                    Rs.
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={milestone.estimatedCost}
                    onChange={(e) =>
                      handleMilestoneChange(
                        index,
                        "estimatedCost",
                        e.target.value
                      )
                    }
                    className={`w-full pl-10 py-2 border ${
                      errors[`milestone_${index}_cost`]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Milestone Button */}
        <button
          type="button"
          onClick={addMilestone}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 text-gray-700 font-medium"
        >
          <span className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-400 text-gray-700 text-lg leading-none">
            +
          </span>
          Add New Milestone
        </button>
      </div>
    </div>
  )
}

export default MilestoneBuilder
