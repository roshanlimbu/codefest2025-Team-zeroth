import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DonationProvider } from "../context/DonationContext"
import axiosClient from "../api/axiosClient"
import CampaignHero from "../components/donation/CampaignHero"
import BeneficiaryProfile from "../components/donation/BeneficiaryProfile"
import MilestoneProgressSection from "../components/donation/MilestoneProgressSection"
import DonationForm from "../components/donation/DonationForm"
import CampaignOverview from "../components/donation/CampaignOverview"
import DonationList from "../components/donation/DonationList"
import ShareCampaign from "../components/donation/ShareCampaign"

const DonationPage = () => {
  const { id: campaignId } = useParams()
  const [campaignData, setCampaignData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const resp = await axiosClient.get('/api/campaigns/getcampaignbyid', { params: { id: campaignId } })
        setCampaignData(resp.data)
      } catch (err) {
        console.error('Failed to fetch campaign', err)
        setError(err.response?.data?.error || err.message || 'Failed to fetch campaign')
      } finally {
        setLoading(false)
      }
    }

    if (campaignId) load()
  }, [campaignId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading campaign...</div>
      </div>
    )
  }

  if (error || !campaignData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Campaign Not Found</h1>
            <p className="text-gray-600">The campaign you're looking for doesn't exist.</p>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </main>
      </div>
    )
  }

  return (
    <DonationProvider campaignData={campaignData}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {/* Hero Section */}
          <CampaignHero />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <BeneficiaryProfile />
              <CampaignOverview />
              <MilestoneProgressSection />
                <ShareCampaign campaign={campaignData} />
              <DonationList campaignId={campaignData.id} />
            </div>

            {/* Right Column - Donation Form */}
            <div className="lg:col-span-1">
              <DonationForm />
            </div>
          </div>
        </main>
      </div>
    </DonationProvider>
  )
}

export default DonationPage
