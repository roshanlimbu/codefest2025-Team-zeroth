import { createContext, useContext, useState } from "react"

const DonationContext = createContext()

const DonationProvider = ({ children, campaignData }) => {
    // Safe defaults and fallbacks for legacy/mock/partial campaign objects
    const campaign = campaignData || {}

    const beneficiary = campaign.beneficiary || (campaign.creator ? {
        name: campaign.creator.name || 'Beneficiary',
        profileImage: null,
        story: ''
    } : { name: 'Beneficiary', profileImage: null, story: '' })

    // Try to extract district/province from location if available (simple split), else default
    const locationStr = campaign.location || ''
    const [district = '', province = ''] = locationStr ? locationStr.split(',').map(s => s.trim()) : [ '', '' ]

    const providerData = {
        campaign: {
            id: campaign.id,
            title: campaign.title || 'Untitled Campaign',
            heroImage: campaign.heroImage || '/placeholder.svg',
            status: campaign.status || 'DRAFT',
            aiApproved: true,
            secureBlockchain: true,
            totalTarget: Number(campaign.fundTarget || 0),
            totalRaised: Number(campaign.fundRaised || 0),
            currency: "Rs",
            featured: true,
            district: district || campaign.district || 'Unknown',
            province: province || campaign.province || 'Unknown',
            affectedPeople: campaign.affectedPeople || 0,
        },
        beneficiary,
        donationOptions: campaign.donationOptions || [],
        disaster: campaign.disaster || null,
        milestones: campaign.milestones || [],
    }

    const [selectedAmount, setSelectedAmount] = useState(50)
    const [customAmount, setCustomAmount] = useState("")
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [donationMessage, setDonationMessage] = useState("")

    const value = {
        ...providerData,

        // Donation state
        selectedAmount,
        setSelectedAmount,
        customAmount,
        setCustomAmount,
        isAnonymous,
        setIsAnonymous,
        donationMessage,
        setDonationMessage,

        // Computed values (guard division by zero)
        fundingProgress: providerData.campaign.totalTarget > 0 ? (providerData.campaign.totalRaised / providerData.campaign.totalTarget) * 100 : 0,
        remainingAmount: Math.max(0, providerData.campaign.totalTarget - providerData.campaign.totalRaised),

        // Actions
        handleDonation: () => {
            console.log("Processing donation:", {
                amount: customAmount || selectedAmount,
                isAnonymous,
                message: donationMessage,
            })
            alert(`Thank you for your donation of Rs ${customAmount || selectedAmount}!`)
        },
    }

    return <DonationContext.Provider value={value}>{children}</DonationContext.Provider>
}

const useDonation = () => {
    const context = useContext(DonationContext)
    if (!context) {
        throw new Error("useDonation must be used within a DonationProvider")
    }
    return context
}

export { DonationProvider, useDonation }
