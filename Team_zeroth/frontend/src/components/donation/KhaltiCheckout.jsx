import React, { useState } from 'react'
import { useDonation } from '../../context/DonationContext'

const KhaltiCheckout = ({ campaignId }) => {
  const { selectedAmount, customAmount, handleDonation } = useDonation()
  const [loading, setLoading] = useState(false)

  const amountNPR = Number(customAmount || selectedAmount || 0)

  const onClick = async () => {
    setLoading(true)
    try {
      await handleDonation()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-4">
      <button onClick={onClick} disabled={amountNPR <= 0} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md mb-2">
        {loading ? 'Redirecting to Khalti…' : `Pay with Khalti (Rs ${amountNPR})`}
      </button>
    </div>
  )
}

export default KhaltiCheckout
