import { FileText } from "lucide-react"

const ReceiptPreview = ({ file }) => {
  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Receipt Scanner Preview</h2>

      {file ? (
        <div className="border-2 border-gray-200 rounded-lg p-8">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-orange-500" />
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-900 mb-1">{file.name}</p>
              <p className="text-sm text-gray-500">{file.type.includes("pdf") ? "PDF Document" : "Image File"}</p>
              <p className="text-sm text-gray-500">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            {file.type.includes("image") && (
              <div className="mt-4 max-w-full">
                <img
                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                  alt="Receipt preview"
                  className="max-h-64 rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="border-2 border-gray-200 rounded-lg p-12 bg-gray-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-center">Upload a receipt to see its preview</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReceiptPreview