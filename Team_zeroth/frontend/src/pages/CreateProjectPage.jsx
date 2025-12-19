import { useState } from "react"
import FileUploadSection from "../components/create-project/FileUploadSection"
import MilestoneBuilder from "../components/create-project/MileStoneBuilder"
import ProjectDetailsSection from "../components/create-project/ProjectDetailsSection"
import ReviewSubmit from "../components/create-project/ReviewSubmit"
import LivePreviewCard from "../components/create-project/LivePreviewCard"

const CreateProjectPage = () => {
  const [projectData, setProjectData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    files: [],
  })

  const [milestones, setMilestones] = useState([
    { id: 1, title: "", description: "", targetDate: "", estimatedCost: 0 },
  ])

  const [errors, setErrors] = useState({})
  const [uploadedFiles, setUploadedFiles] = useState([])

  // Calculate total cost from milestones
  const totalCost = milestones.reduce((sum, milestone) => {
    return sum + (Number.parseFloat(milestone.estimatedCost) || 0)
  }, 0)

  // Handle input changes
  const handleInputChange = (field, value) => {
    setProjectData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  // Handle milestone changes
  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = [...milestones]
    updatedMilestones[index][field] = value
    setMilestones(updatedMilestones)
  }

  // Add new milestone
  const addMilestone = () => {
    setMilestones([
      ...milestones,
      {
        id: Date.now(),
        title: "",
        description: "",
        targetDate: "",
        estimatedCost: 0,
      },
    ])
  }

  // Remove milestone
  const removeMilestone = (index) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((_, i) => i !== index))
    }
  }

  // Handle file upload
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = []
    const newErrors = []

    files.forEach((file) => {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "video/mp4", "video/quicktime"]
      if (!validTypes.includes(file.type)) {
        newErrors.push(`${file.name}: Invalid file type`)
        return
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        newErrors.push(`${file.name}: File size exceeds 10MB`)
        return
      }

      validFiles.push({
        id: Date.now() + Math.random(),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        preview: URL.createObjectURL(file),
      })
    })

    if (newErrors.length > 0) {
      setErrors((prev) => ({ ...prev, files: newErrors.join(", ") }))
    } else {
      setErrors((prev) => ({ ...prev, files: "" }))
    }

    setUploadedFiles((prev) => [...prev, ...validFiles])
  }

  // Remove uploaded file
  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId))
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!projectData.title.trim()) {
      newErrors.title = "Project title is required"
    }

    if (!projectData.category) {
      newErrors.category = "Project category is required"
    }

    if (!projectData.location.trim()) {
      newErrors.location = "Location is required"
    }

    if (!projectData.description.trim()) {
      newErrors.description = "Project description is required"
    } else if (projectData.description.trim().length < 50) {
      newErrors.description = "Description must be at least 50 characters"
    }

    if (uploadedFiles.length === 0) {
      newErrors.files = "Please upload at least one photo or video"
    }

    // Validate milestones
    milestones.forEach((milestone, index) => {
      if (!milestone.title.trim()) {
        newErrors[`milestone_${index}_title`] = "Milestone title is required"
      }
      if (!milestone.description.trim()) {
        newErrors[`milestone_${index}_description`] = "Milestone description is required"
      }
      if (!milestone.targetDate) {
        newErrors[`milestone_${index}_date`] = "Target date is required"
      }
      if (!milestone.estimatedCost || milestone.estimatedCost <= 0) {
        newErrors[`milestone_${index}_cost`] = "Valid cost is required"
      }
    })

    if (totalCost === 0) {
      newErrors.totalCost = "Total project cost must be greater than $0"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Form submitted successfully", {
        projectData,
        milestones,
        uploadedFiles,
        totalCost,
      })
      alert("Project submitted successfully!")
      // Here you would typically send data to your backend
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        {/* Page Title */}
        <div className="mb-12 max-w-3xl flex flex-col justify-center items-center">
          {/* subtle context label */}
          <span className="inline-block text-sm text-gray-500 mb-3">
            Project setup
          </span>

          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-snug">
            Create Your Project
          </h1>

          {/* gentle divider */}
          <div className="w-14 h-0.5 bg-orange-400 mb-5" />

          <p className="text-gray-600 text-base md:text-lg leading-relaxed text-center max-w-2xl mx-auto">
            Share clear and honest details about your project.
            <br className="hidden sm:block" />
            Our AI verification process helps build trust and ensures transparency for everyone involved.
          </p>

        </div>

        <form onSubmit={handleSubmit}>
          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-8">
              <ProjectDetailsSection projectData={projectData} errors={errors} handleInputChange={handleInputChange} />

              <FileUploadSection
                uploadedFiles={uploadedFiles}
                errors={errors}
                handleFileUpload={handleFileUpload}
                removeFile={removeFile}
              />

              <MilestoneBuilder
                milestones={milestones}
                errors={errors}
                handleMilestoneChange={handleMilestoneChange}
                addMilestone={addMilestone}
                removeMilestone={removeMilestone}
              />

              <ReviewSubmit totalCost={totalCost} errors={errors} />
            </div>

            {/* Right Column - Live Preview Card */}
            <LivePreviewCard projectData={projectData} uploadedFiles={uploadedFiles} milestones={milestones} />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProjectPage