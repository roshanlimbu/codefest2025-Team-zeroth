import { MapPin } from "lucide-react";

const ProjectDetailsSection = ({ projectData, errors, handleInputChange }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Details</h2>
          <p className="text-gray-600 text-sm">Provide general information about your project and affected location.</p>
        </div>

        {/* Project Title */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Campaign Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={projectData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="enter campaign title"
            className={`w-full px-3 py-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
          />
          {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
        </div>

        {/* Campaign Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Campaign Category <span className="text-red-500">*</span>
          </label>
          <select
            value={projectData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className={`w-full px-3 py-2 border ${
              errors.category ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white`}
          >
            <option value="">Select category</option>
            <option value="disaster">Disaster Relief</option>
            <option value="health">Health & Medical</option>
            <option value="education">Education</option>
            <option value="environment">Environment</option>
            <option value="community">Community Development</option>
            <option value="other">Other</option>
          </select>
          {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={projectData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="enter your location"
            className={`w-full px-3 py-2 border ${
              errors.location ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
          />
          {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
          {projectData.location && (
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <MapPin className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{projectData.location}</span>
            </div>
          )}
        </div>

        {/* Campaign Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Campaign Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={projectData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder="Describe your project in detail (minimum 50 characters)"
            className={`w-full min-h-32 px-3 py-2 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none`}
            rows={5}
          />
          <div className="flex justify-between items-center">
            {errors.description ? (
              <p className="text-red-500 text-xs">{errors.description}</p>
            ) : (
              <p className="text-gray-500 text-xs">{projectData.description.length} characters</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetailsSection;
