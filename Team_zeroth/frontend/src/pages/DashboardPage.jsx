import React, { useEffect, useState } from 'react'
import useProfileCheck from '../hooks/useProfileCheck'
import CampaignCard from '../components/campaigns/CampaignCard'
import UserDonationsList from '../components/donation/UserDonationsList'
import TopDonors from '../components/donation/TopDonors'

const DashboardPage = () => {
  const { user, loading: profileLoading, campaigns: profileCampaigns = [] } = useProfileCheck()
  const [loading, setLoading] = useState(false)
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    if (!user) return
    setLoading(true)
    try {
      const live = (profileCampaigns || []).filter(c => String(c.status).toUpperCase() === 'LIVE')
      setCampaigns(live)
    } catch (err) {
      console.error('Failed to derive campaigns from profile', err)
      setCampaigns([])
    } finally {
      setLoading(false)
    }
  }, [user, profileCampaigns])

  if (profileLoading) return <div className="p-8">Loading profile…</div>

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome {user?.name || ''}</h1>
          <p className="text-gray-600 mt-2">Your verified & live campaigns are shown below.</p>
        </div>

          {/* <section className="mb-12"> */}
          {/*   <h2 className="text-xl font-semibold mb-4">Top Donors</h2> */}
          {/*   <TopDonors limit={10} /> */}
          {/* </section> */}

        {user && String(user.type).toUpperCase() !== 'DONOR' && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Live Campaigns</h2>

            {loading ? (
              <div className="text-gray-600">Loading campaigns…</div>
            ) : campaigns.length > 0 ? (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {campaigns.map(c => (
                  <CampaignCard key={c.id} campaign={c} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg border border-dashed border-gray-200 p-8 text-center">
                <p className="text-gray-700 mb-4">You don't have any Live campaigns yet.</p>
                <p className="text-sm text-gray-500">Create a campaign and submit it for review. Once approved and set to "Live" by an admin, it will appear here.</p>
              </div>
            )}
          </section>
        )}

        {user && String(user.type).toUpperCase() === 'DONOR' && (
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Your Recent Donations</h2>
            <UserDonationsList userId={user.id} />
          </section>
        )}

      </div>
    </div>
  )
}

export default DashboardPage
