import React, { useState } from 'react'
import { Twitter, Facebook, Share2, Clipboard, QrCode, Mail } from 'lucide-react'

const ShareCampaign = ({ campaign }) => {
  const [copied, setCopied] = useState(false)
  const [imgError, setImgError] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : `${window?.location?.origin}/donation/${campaign?.id}`
  const text = encodeURIComponent(`${campaign?.title} — Support this campaign: ${url}`)

  const shareToTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
  const shareToFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
  const shareToWhatsApp = () => window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank')
  const shareToEmail = () => window.open(`mailto:?subject=${encodeURIComponent(campaign?.title || 'Support this campaign')}&body=${text}`)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.warn('copy failed', e)
    }
  }

  // Use WR provided QR image URL as primary QR image
  const wrQrUrl = 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_300,h_300/https://prooftag.net/wp-content/uploads/2021/07/QR-Code.png'
  const qrSrc = wrQrUrl

  // Fallback SVG data URL (simple QR-like placeholder) used when external QR fails
  const fallbackSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><rect width='200' height='200' fill='%23ffffff'/><rect x='10' y='10' width='40' height='40' fill='%23000'/><rect x='150' y='10' width='40' height='40' fill='%23000'/><rect x='10' y='150' width='40' height='40' fill='%23000'/><rect x='70' y='70' width='20' height='20' fill='%23000'/><rect x='100' y='70' width='20' height='20' fill='%23000'/><rect x='70' y='100' width='20' height='20' fill='%23000'/><rect x='100' y='100' width='20' height='20' fill='%23000'/></svg>`
  const fallbackDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(fallbackSvg)}`

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h4 className="font-semibold text-gray-900 mb-3">Share this campaign</h4>

      <div className="flex items-center gap-2 mb-4">
        <button onClick={shareToTwitter} className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-md">
          <Twitter className="w-4 h-4" /> Share
        </button>
        <button onClick={shareToFacebook} className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-md">
          <Facebook className="w-4 h-4" /> Share
        </button>
        <button onClick={shareToWhatsApp} className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-md">
          <Share2 className="w-4 h-4" /> WhatsApp
        </button>
      </div>

      <div className="flex items-center gap-3">
        <img
          src={imgError ? fallbackDataUrl : qrSrc}
          alt="QR code"
          className="w-24 h-24 rounded-md border"
          onError={() => setImgError(true)}
        />
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-2">Scan or copy link to share this campaign.</p>
          <div className="flex gap-2">
            <button onClick={copyLink} className="px-3 py-2 bg-gray-100 rounded-md flex items-center gap-2">
              <Clipboard className="w-4 h-4" /> {copied ? 'Copied' : 'Copy link'}
            </button>
            <button onClick={shareToEmail} className="px-3 py-2 bg-gray-100 rounded-md flex items-center gap-2">
              <Mail className="w-4 h-4" /> Email
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareCampaign
