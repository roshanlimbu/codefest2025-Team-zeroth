import React, { useEffect, useState } from 'react'
import axiosClient from '../../api/axiosClient'

const DonationList = ({ campaignId }) => {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!campaignId) return
    setLoading(true)
    axiosClient.get(`/api/donations/campaign/${campaignId}`)
      .then(resp => {
        setDonations(resp.data.donations || [])
      })
      .catch(err => {
        console.warn('Failed to load donations', err)
        setDonations([])
      })
      .finally(() => setLoading(false))
  }, [campaignId])

  if (loading) return <div className="p-4">Loading donations…</div>

  if (!donations.length) return (
    <div className="bg-white rounded-lg p-4 border border-gray-100">
      <h3 className="font-semibold mb-2">Recent Donations</h3>
      <p className="text-sm text-gray-500">No donations yet — be the first to contribute!</p>
    </div>
  )

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100">
      <h3 className="font-semibold mb-3">Recent Donations</h3>
      <ul className="space-y-3">
        {donations.map(d => (
          <li key={d.id} className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-sm text-gray-700">
              {d.anonymous ? 'AN' : (d.donorName ? d.donorName.split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase() : 'NA')}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-gray-900">{d.anonymous ? 'Anonymous' : d.donorName || 'Donor'}</div>
                <div className="text-sm text-gray-600">Rs {Number(d.amount).toLocaleString()}</div>
              </div>
              {d.message && <p className="text-sm text-gray-700 mt-1">{d.message}</p>}
              <div className="text-xs text-gray-400 mt-1">{new Date(d.createdAt).toLocaleString()}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DonationList
