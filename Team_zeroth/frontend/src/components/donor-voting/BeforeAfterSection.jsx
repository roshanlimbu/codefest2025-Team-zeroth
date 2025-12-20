const BeforeAfterSection = ({ beforeImage, afterImage }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Before & After</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Before Image */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Before</p>
          <div className="rounded-lg overflow-hidden border-2 border-gray-200">
            <img
              src={beforeImage.imageUrl || "/placeholder.svg"}
              alt={beforeImage.caption}
              className="w-full h-48 object-cover"
            />
          </div>
        </div>

        {/* After Image */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">After</p>
          <div className="rounded-lg overflow-hidden border-2 border-gray-200">
            <img
              src={afterImage.imageUrl || "/placeholder.svg"}
              alt={afterImage.caption}
              className="w-full h-48 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeforeAfterSection