import { Search, Filter, MapPin } from "lucide-react"
import { useState } from "react"
import { campaignsData } from "../data/campaignData"
import CampaignCard from "../components/campaigns/CampaignCard"

const CampaignsPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Filter campaigns
  const filteredCampaigns = campaignsData.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.district.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === "all" || campaign.category === filterType

    return matchesSearch && matchesFilter
  })

  // Get unique categories
  const categories = ["all", ...new Set(campaignsData.map((c) => c.category || "other"))]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Nepal Support Campaigns</h1>
              <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                Support communities across Nepal. Every contribution makes a difference.
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location or campaign name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Filter */}
              <div className="md:w-64 relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat === "all"
                        ? "All Categories"
                        : cat.charAt(0).toUpperCase() + cat.slice(1).replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-orange-500 mb-2">{campaignsData.length}</div>
              <div className="text-gray-600">Active Campaigns</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {campaignsData.reduce((sum, c) => sum + (c.affectedPeople || 0), 0)}
              </div>
              <div className="text-gray-600">People Affected</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                Rs {campaignsData.reduce((sum, c) => sum + (c.fundRaised || 0), 0).toLocaleString()}
              </div>
              <div className="text-gray-600">Total Raised</div>
            </div>
          </div>

          {/* Campaigns Grid */}
          <div className="pb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredCampaigns.length} Campaign{filteredCampaigns.length !== 1 ? "s" : ""} Found
              </h2>
            </div>

            {filteredCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No campaigns found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default CampaignsPage
