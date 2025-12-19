const LivePreviewCard = ({ projectData, uploadedFiles, milestones }) => {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-18">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Live Preview</h3>

            {projectData.title && (
              <h4 className="text-xl font-bold text-gray-900">
                {projectData.title}
              </h4>
            )}

            {uploadedFiles.length > 0 &&
              uploadedFiles[0].type.startsWith("image/") && (
                <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-200">
                  <img
                    src={uploadedFiles[0].preview || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

            {/* User */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-semibold">
                U
              </div>
              <span className="text-sm font-medium text-gray-900">
                Your Name
              </span>
            </div>

            {projectData.description && (
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-6">
                {projectData.description}
              </p>
            )}

            {/* Location (SVG removed) */}
            {projectData.location && (
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="flex flex-col items-center">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="w-px h-4 bg-orange-200" />
                </div>
                <span>{projectData.location}</span>
              </div>
            )}

            {projectData.category && (
              <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                {projectData.category.charAt(0).toUpperCase() +
                  projectData.category.slice(1)}
              </div>
            )}

            {milestones.length > 0 && milestones[0].title && (
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                  Milestone Progress
                </h4>

                <div className="space-y-2">
                  {milestones.slice(0, 3).map((milestone, index) => (
                    <div key={milestone.id} className="text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-700 text-xs">
                          {milestone.title || `Milestone ${index + 1}`}
                        </span>

                        {milestone.estimatedCost > 0 && (
                          <span className="text-gray-900 text-xs font-medium">
                            Rs.{" "}
                            {Number.parseFloat(
                              milestone.estimatedCost
                            ).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                  {milestones.length > 3 && (
                    <p className="text-xs text-gray-500">
                      +{milestones.length - 3} more milestones
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LivePreviewCard
