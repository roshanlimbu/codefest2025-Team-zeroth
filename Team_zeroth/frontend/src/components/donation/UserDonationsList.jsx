import React, { useEffect, useState } from 'react'
import axiosClient from '../../api/axiosClient'

const UserDonationsList = ({ userId }) => {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    axiosClient.get(`/api/donations/user/${userId}`)
      .then(resp => setDonations(resp.data.donations || []))
      .catch(err => {
        console.warn('Failed to load user donations', err)
        setDonations([])
      })
      .finally(() => setLoading(false))
  }, [userId])

  if (loading) return <div className="p-4">Loading your donations…</div>

  if (!donations.length) return (
    <div className="bg-white rounded-lg p-4 border border-gray-100">
      <h3 className="font-semibold mb-2">Your Donations</h3>
      <p className="text-sm text-gray-500">You haven't made any donations yet.</p>
    </div>
  )

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100">
      <h3 className="font-semibold mb-3">Your Donations</h3>
      <ul className="space-y-3">
        {donations.map(d => {
          const milestones = d.campaignMilestones || [];
          // find first incomplete milestone (current)
          const current = milestones.find(m => !m.isFulfilled) || null;
          // if none, mark last milestone as fulfilled
          const statusLabel = current ? 'Pending' : (milestones.length ? 'Fulfilled' : 'No milestones');

          return (
            <li key={d.id} className="flex items-start gap-3">
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{d.campaignTitle || 'Campaign'}</div>
                    <div className="text-xs text-gray-500">{current ? `Current milestone: ${current.title}` : (milestones.length ? `All milestones completed` : 'No milestones for campaign')}</div>
                  </div>
                  <div className="text-sm text-gray-600">Rs {Number(d.amount).toLocaleString()}</div>
                </div>

                {d.message && <p className="text-sm text-gray-700 mt-1">{d.message}</p>}

                <div className="flex items-center gap-3 mt-2">
                  <div className={`text-xs font-semibold ${statusLabel === 'Fulfilled' ? 'text-emerald-700' : 'text-yellow-600'}`}>
                    {statusLabel}
                  </div>
                  {current && (
                    <div className="text-xs text-gray-500">{`${current.raisedAmount.toLocaleString()} / ${current.target.toLocaleString()} raised`}</div>
                  )}
                </div>

                <div className="text-xs text-gray-400 mt-1">{new Date(d.createdAt).toLocaleString()}</div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UserDonationsList
