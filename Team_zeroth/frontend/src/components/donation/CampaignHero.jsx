import { useDonation } from "../../context/DonationContext"

const CampaignHero = () => {
  const { campaign } = useDonation()

  const fallbackImage =
    "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1600&auto=format&fit=crop"

  return (
    <div className="relative w-full h-80 overflow-hidden rounded-2xl shadow-lg mb-8">
      <img
        src={campaign.heroImage || fallbackImage}
        alt={campaign.title}
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-4xl">
          {campaign.title}
        </h1>
      </div>
    </div>
  )
}

export default CampaignHero
