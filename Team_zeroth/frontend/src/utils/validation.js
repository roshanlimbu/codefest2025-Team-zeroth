// Validation functions for milestone verification

export const validateFile = (file) => {
  const errors = []
  const maxSize = 10 * 1024 * 1024 // 10MB
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]

  if (!file) {
    errors.push("File is required")
    return { isValid: false, errors }
  }

  if (file.size > maxSize) {
    errors.push("File size must be less than 10MB")
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push("File must be an image (JPG, PNG) or PDF")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateVerificationData = (data) => {
  const errors = []

  if (!data.verificationSummary) {
    errors.push("Verification summary is required")
    return { isValid: false, errors }
  }

  const { aiAccuracyScore, fraudDetectionRisk } = data.verificationSummary

  if (typeof aiAccuracyScore !== "number" || aiAccuracyScore < 0 || aiAccuracyScore > 100) {
    errors.push("AI Accuracy Score must be between 0 and 100")
  }

  if (typeof fraudDetectionRisk !== "number" || fraudDetectionRisk < 0 || fraudDetectionRisk > 100) {
    errors.push("Fraud Detection Risk must be between 0 and 100")
  }

  if (aiAccuracyScore < 70) {
    errors.push("AI Accuracy Score is too low for verification")
  }

  if (fraudDetectionRisk > 30) {
    errors.push("Fraud Detection Risk is too high for verification")
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: [],
  }
}

export const validateMilestone = (milestone) => {
  const errors = []

  if (!milestone.title || milestone.title.trim() === "") {
    errors.push("Milestone title is required")
  }

  if (!milestone.date) {
    errors.push("Milestone date is required")
  }

  if (!["approved", "pending", "rejected"].includes(milestone.status)) {
    errors.push("Invalid milestone status")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}
