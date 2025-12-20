import { useDonation } from "../../context/DonationContext"
import { useState } from "react"
import axiosClient from '../../api/axiosClient'

const BeneficiaryProfile = () => {
  const { beneficiary } = useDonation()
  const [imgError, setImgError] = useState(false)

  const name = beneficiary?.name || ''
  const initials = name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const raw = beneficiary?.profileImage
  const isRelative = typeof raw === 'string' && raw.startsWith('/')
  const src = !raw ? null : (isRelative && axiosClient?.defaults?.baseURL ? `${axiosClient.defaults.baseURL}${raw}` : raw)

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Meet {name || 'Beneficiary'}</h2>

      <div className="flex items-start gap-4">
        {src && !imgError ? (
          <img
            src={src}
            alt={name}
            onError={() => setImgError(true)}
            className="w-20 h-20 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl flex-shrink-0">
            {initials || 'NA'}
          </div>
        )}

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{beneficiary?.story}</p>
        </div>
      </div>
    </div>
  )
}

export default BeneficiaryProfile