import React, { useEffect, useState } from 'react'
import axiosClient from '../../api/axiosClient'

const medalForRank = (rank) => {
  const base = "inline-flex items-center justify-center w-9 h-9 rounded-full text-sm font-bold ring-2 ring-white shadow-sm";
  if (rank === 1) return <span className={`${base} bg-yellow-400 text-white`}>🥇</span>
  if (rank === 2) return <span className={`${base} bg-gray-400 text-white`}>🥈</span>
  if (rank === 3) return <span className={`${base} bg-orange-400 text-white`}>🥉</span>
  return <span className={`${base} bg-gray-100 text-gray-700 font-medium`}>{rank}</span>
}

const initials = (name) => {
  if (!name) return 'A'
  return name.split(' ').map(p => p[0]).slice(0,2).join('').toUpperCase()
}

const TopDonors = ({ limit = 10 }) => {
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    axiosClient.get(`/api/donations/top-donors?limit=${limit}`)
      .then(resp => setDonors(resp.data.donors || []))
      .catch(err => {
        console.warn('Failed to load top donors', err)
        setDonors([])
      })
      .finally(() => setLoading(false))
  }, [limit])

  if (loading) return <div className="p-4">Loading top donors…</div>

  if (!donors.length) return (
    <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
      <h3 className="font-semibold mb-2 text-lg">Top Donors</h3>
      <p className="text-sm text-gray-500">No donations yet.</p>
    </div>
  )

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Top Donors</h3>
        <div className="text-sm text-gray-500">Leaderboard</div>
      </div>
      <ul className="space-y-3">
        {donors.map(d => (
          <li key={`${d.userId || 'anon'}-${d.rank}`} className="flex items-center justify-between p-3 rounded-lg hover:shadow-md transition-shadow bg-white">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm font-semibold text-gray-800">
                  {initials(d.name)}
                </div>
                <div className="absolute bottom-0 right-0" style={{ transform: 'translate(35%, 35%)' }}>{medalForRank(d.rank)}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-900">{d.name}</div>
                <div className="text-xs text-gray-500">{d.donationsCount} donation{d.donationsCount !== 1 ? 's' : ''}</div>
              </div>
            </div>

            <div className="text-sm text-gray-700 font-semibold">Rs {Number(d.totalAmount).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TopDonors
