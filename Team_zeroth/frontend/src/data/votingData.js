const votingDataObj = {
  milestone: {
    id: "milestone-2",
    campaignId: "camp-001",
    title: "Rebuilding of the community center's roof",
    description:
      "Was the rebuilding of the community center's roof completed to satisfactory standards as per Milestone 2?",
    status: "voting",
    votingEndDate: "2024-01-15T23:59:59Z",
  },

  beforeAfter: {
    before: {
      imageUrl: "/placeholder.svg?height=300&width=400",
      caption: "Before - Damaged structure",
    },
    after: {
      imageUrl: "/placeholder.svg?height=300&width=400",
      caption: "After - Rebuilt community center",
    },
  },

  receipts: [
    {
      id: "receipt-1",
      imageUrl: "/placeholder.svg?height=200&width=150",
      title: "Building Materials Receipt",
      date: "2023-12-01",
    },
    {
      id: "receipt-2",
      imageUrl: "/placeholder.svg?height=200&width=150",
      title: "Labour Cost Receipt",
      date: "2023-12-10",
    },
    {
      id: "receipt-3",
      imageUrl: "/placeholder.svg?height=200&width=150",
      title: "Equipment Rental",
      date: "2023-12-15",
    },
  ],

  votingResults: {
    yesVotes: 75,
    noVotes: 25,
    totalVotes: 100,
    yesPercentage: 75,
    noPercentage: 25,
  },

  milestoneUnlocked: {
    isUnlocked: true,
    message:
      "Funds are being released for the next stage of the project. Thank you for your vote!",
  },
};

export default votingDataObj;
