import { createContext, useContext, useState } from "react"

const DonationContext = createContext()

const DonationProvider = ({ children, campaignData }) => {
    // Build the internal structure to match expected format
    const providerData = {
        campaign: {
            id: campaignData.id,
            title: campaignData.title,
            heroImage: campaignData.heroImage,
            status: campaignData.status,
            aiApproved: true,
            secureBlockchain: true,
            totalTarget: campaignData.fundTarget,
            totalRaised: campaignData.fundRaised,
            currency: "Rs",
            featured: true,
            district: campaignData.district,
            province: campaignData.province,
            affectedPeople: campaignData.affectedPeople,
        },
        beneficiary: campaignData.beneficiary,
        donationOptions: campaignData.donationOptions,
        disaster: campaignData.disaster,
        milestones: campaignData.milestones,
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

        // Computed values
        fundingProgress: (providerData.campaign.totalRaised / providerData.campaign.totalTarget) * 100,
        remainingAmount: providerData.campaign.totalTarget - providerData.campaign.totalRaised,

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
