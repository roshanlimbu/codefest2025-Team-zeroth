export const milestones = {
  milestones: [
    {
      id: "m1",
      name: "Emergency Relief",
      target: 60000,
      achievedAmount: 45000,
      isCompleted: false,
      description: "Providing immediate assistance to affected families.",
      isLocked: false
    },
    {
      id: "m2",
      name: "Home Structure Rebuild",
      target: 150000,
      achievedAmount: 150000,
      isCompleted: true,
      description: "Rebuilding homes for affected families.",
      isLocked: true
    },
    {
      id: "m3",
      name: "Interior & Essentials",
      target: 80000,
      achievedAmount: 20000,
      isCompleted: false,
      description: "Providing interior and essential items to affected families.",
      isLocked: true
    }
  ]
};

export const milestoneVerificationSummary = {
  aiAccuracyScore: 92,
  fraudDetectionRisk: 8,
  geoLocationVerified: true
};

export const milestoneHistory = {
  milestoneHistory: [
    {
      id: 1,
      name: "Emergency Relief Verification",
      date: "2025-01-12",
      status: "approved"
    },
    {
      id: 2,
      name: "Rebuild Phase Inspection",
      date: "2025-01-19",
      status: "pending"
    },
    {
      id: 3,
      name: "Interior Setup Review",
      date: "2025-01-25",
      status: "rejected"
    }
  ]
};


export const communityConsensus = {
  totalVoters: 182,
  votes: {
    yes: {
      count: 134,
      percentage: 73.6
    },
    no: {
      count: 48,
      percentage: 26.4
    }
  }
};
