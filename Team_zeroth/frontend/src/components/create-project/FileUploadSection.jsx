const FileUploadSection = ({ uploadedFiles, errors, handleFileUpload, removeFile }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Media Upload</h2>
          <p className="text-gray-600 text-sm">
            Upload photos and videos to showcase your project. Multiple files supported.
          </p>
        </div>

        {/* Upload Section */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload Photos/Videos <span className="text-red-500">*</span>
          </label>
          <div
            className={`border-2 border-dashed ${errors.files ? "border-red-500" : "border-gray-300"
              } rounded-lg p-8 text-center hover:border-orange-500 transition-colors cursor-pointer`}
            onClick={() => document.getElementById("fileInput").click()}
          >
            <input
              id="fileInput"
              type="file"
              multiple
              accept="image/jpeg,image/png,image/jpg,video/mp4,video/quicktime"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-400 text-2xl">
                +
              </div>
              <div>
                <p className="text-sm text-gray-600">Drag & drop files here, or click to browse</p>
                <p className="text-xs text-gray-500">Supports JPG, PNG, MP4, MOV (max 10MB each)</p>
              </div>
            </div>
          </div>
          {errors.files && <p className="text-red-500 text-xs">{errors.files}</p>}

          {/* Uploaded Files Preview */}
          {uploadedFiles.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="relative group w-28">
                  {/* Image / Video Wrapper */}
                  <div className="h-28 w-28 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-visible">
                    {file.type.startsWith("image/") ? (
                      <img
                        src={file.preview || "/placeholder.svg"}
                        alt={file.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-sm font-medium">
                        <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">🎬</div>
                        Video
                      </div>
                    )}
                  </div>

                  {/* Remove Button Outside */}
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white font-extrabold text-lg rounded-full flex items-center justify-center"
                  >
                    ✕
                  </button>

                  {/* File Name */}
                  <p className="text-xs text-gray-600 mt-1 truncate w-28 block" title={file.name}>
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          )}


        </div>

        {/* AI Verification Progress */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">AI Verification Progress</label>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((uploadedFiles.length / 5) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600">
              {Math.min((uploadedFiles.length / 5) * 100, 100).toFixed(0)}% complete. Uploading more geo-tagged media
              improves score.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FileUploadSection
