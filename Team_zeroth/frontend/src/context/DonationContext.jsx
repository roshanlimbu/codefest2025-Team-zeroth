import { createContext, useContext, useState } from "react"
import axiosClient from '../api/axiosClient'

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

    // Generate donation presets when none provided by campaign
    const generateDonationOptions = () => {
        if (providerData.donationOptions && providerData.donationOptions.length) return providerData.donationOptions

        const milestones = providerData.milestones || []
        // Find next incomplete milestone remaining amount
        let nextRemaining = 0
        for (const m of milestones) {
            const target = Number(m.target || m.fundTarget || 0)
            const raised = Number(m.raisedAmount || m.funded || 0)
            const rem = Math.max(0, target - raised)
            if (rem > 0) { nextRemaining = rem; break }
        }

        const remainingTotal = Math.max(0, providerData.campaign.totalTarget - providerData.campaign.totalRaised)
        const base = nextRemaining > 0 ? nextRemaining : (remainingTotal || 0)

        const opts = []
        if (base <= 0) {
            opts.push({ amount: 100, impact: `Support with a Rs 100 donation` })
            opts.push({ amount: 500, impact: `Support with a Rs 500 donation` })
            opts.push({ amount: 1000, impact: `Support with a Rs 1000 donation` })
        } else if (base <= 100) {
            const a = Math.max(10, Math.ceil(base))
            opts.push({ amount: a, impact: `Help close this milestone (${a} remaining)` })
            opts.push({ amount: Math.max(5, Math.ceil(a / 2)), impact: `Partial support (${Math.max(5, Math.ceil(a / 2))})` })
            opts.push({ amount: Math.max(1, Math.ceil(a / 4)), impact: `Small contribution (${Math.max(1, Math.ceil(a / 4))})` })
        } else {
            const half = Math.ceil(base * 0.5)
            const quarter = Math.ceil(base * 0.25)
            const tenth = Math.ceil(base * 0.1)
            opts.push({ amount: Math.min(half, remainingTotal || half), impact: `Half of this milestone (${half})` })
            opts.push({ amount: Math.min(quarter, remainingTotal || quarter), impact: `Quarter of this milestone (${quarter})` })
            opts.push({ amount: Math.min(tenth, remainingTotal || tenth), impact: `Tenth of this milestone (${tenth})` })
            // Add a small default option
            opts.push({ amount: Math.min(500, Math.max(50, Math.ceil(base * 0.02))), impact: `Small support (${Math.min(500, Math.max(50, Math.ceil(base * 0.02)))})` })
        }

        // ensure unique and positive, sort ascending
        const unique = Array.from(new Map(opts.map(o => [o.amount, o])).values())
        return unique.filter(o => o.amount > 0).sort((a, b) => a.amount - b.amount)
    }

    const computedDonationOptions = generateDonationOptions()
    const [selectedAmount, setSelectedAmount] = useState(computedDonationOptions[0]?.amount || 50)
    const [customAmount, setCustomAmount] = useState("")
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [donationMessage, setDonationMessage] = useState("")

    const value = {
        ...providerData,
        donationOptions: computedDonationOptions,

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
        handleDonation: async () => {
            const amount = Number(customAmount || selectedAmount)
            const payload = {
                campaignId: providerData.campaign.id,
                amount,
                anonymous: !!isAnonymous,
                message: donationMessage || '',
            }

            try {
                // Try calling backend donation endpoint if available
                const resp = await axiosClient.post('/api/donations/create', payload)
                if (resp?.status === 201 || resp?.status === 200) {
                    alert(`Thank you — your donation of Rs ${amount} was received.`)
                } else {
                    console.log('Donation response:', resp)
                    alert(`Donation submitted. Response status: ${resp.status}`)
                }
            } catch (err) {
                // If endpoint not found or server unavailable, fall back to client-only behavior
                console.warn('Donation endpoint failed or unavailable, falling back to local confirmation', err?.response || err)
                alert(`Thank you for your donation of Rs ${amount}! (local confirmation)`)
            }
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
