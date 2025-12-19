import { Upload, CheckCircle, X } from "lucide-react"
import { useCallback } from "react"

const UploadSection = ({ onFileUpload, uploadedFile }) => {
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      const file = e.dataTransfer.files[0]
      if (file) {
        onFileUpload(file)
      }
    },
    [onFileUpload],
  )

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      onFileUpload(file)
    }
  }

  const handleRemoveFile = () => {
    onFileUpload(null)
  }

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Milestone Proof</h2>

      {uploadedFile ? (
        <div className="border-2 border-green-300 bg-green-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                <p className="text-sm text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="p-2 hover:bg-red-100 rounded-full transition-colors"
              title="Remove file"
            >
              <X className="w-5 h-5 text-red-600" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-orange-400 transition-colors cursor-pointer"
        >
          <input type="file" id="file-upload" className="hidden" onChange={handleFileSelect} accept="image/*,.pdf" />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-600">
                Drag & drop your files here, or <span className="text-orange-500 font-medium">click to browse</span>
              </p>
              <p className="text-xs text-gray-500">Supported formats: JPG, PNG, PDF (Max 10MB)</p>
            </div>
          </label>
        </div>
      )}
    </div>
  )
}

export default UploadSection