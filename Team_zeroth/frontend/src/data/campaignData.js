const campaignsData = [
  {
    id: "np001",
    title: "Sindhupalchok Landslide Emergency Aid",
    category: "disaster",
    disasterType: "Landslide",
    district: "Sindhupalchok",
    province: "Bagmati Province",
    lat: 27.8731,
    lng: 85.8288,
    status: "active",
    affectedPeople: 85,
    fundRaised: 45000,
    fundTarget: 120000,
    heroImage: "https://picsum.photos/800/400?random=1",
    beneficiary: {
      name: "सरिता गुरुङ (Sarita Gurung)",
      profileImage: "https://picsum.photos/80/80?random=1",
      story:
        "सरिता, तीन बच्चाहरूकी आमा, सिन्धुपाल्चोकमा हालैको पहिरोमा आफ्नो घर गुमाउनुभयो। उनको परिवार अहिले अस्थायी शरणस्थलमा बसिरहेको छ।"
    },
    donationOptions: [
      { amount: 500, impact: "तपाईंको रु ५०० दानले दुई परिवारलाई तीन दिनको लागि खाना खुवाउन सक्छ।" },
      { amount: 1000, impact: "तपाईंको रु १,००० दानले १० परिवारलाई एक हप्ताको लागि सफा पानी प्रदान गर्न सक्छ।" },
      { amount: 2500, impact: "तपाईंको रु २,५०० दानले एक परिवारको लागि अस्थायी आश्रय सामग्री प्रदान गर्न सक्छ।" },
      { amount: 5000, impact: "तपाईंको रु ५,००० दानले २५ परिवारहरूको लागि चिकित्सा आपूर्ति प्रदान गर्न सक्छ।" }
    ],
    disaster: {
      location: "Sindhupalchok District, Bagmati Province, Nepal",
      type: "Landslide",
      immediateNeeds: ["Emergency Shelter", "Food & Water", "Medical Supplies", "Reconstruction Materials"],
      image: "https://picsum.photos/600/300?random=1"
    },
    milestones: [
      { id: 1, title: "५० परिवारका लागि आपतकालीन खाना र पानी प्रदान गर्नुहोस्", target: 25000, achieved: 15000, status: "in-progress" },
      { id: 2, title: "२० परिवारका लागि अस्थायी आश्रय स्थापना गर्नुहोस्", target: 35000, achieved: 18000, status: "in-progress" },
      { id: 3, title: "चिकित्सा आपूर्ति र स्वच्छता किटहरू वितरण गर्नुहोस्", target: 20000, achieved: 12000, status: "in-progress" },
      { id: 4, title: "५ क्षतिग्रस्त घरहरूको पुनर्निर्माण सुरु गर्नुहोस्", target: 40000, achieved: 0, status: "pending" }
    ]
  },
  {
    id: "np005",
    title: "Community Library Project",
    category: "education",
    district: "Kathmandu",
    province: "Bagmati Province",
    lat: 27.7172,
    lng: 85.3240,
    status: "active",
    affectedPeople: 500,
    fundRaised: 15000,
    fundTarget: 50000,
    heroImage: "https://picsum.photos/800/400?random=2",
    beneficiary: {
      name: "Kathmandu Community",
      profileImage: "https://picsum.photos/80/80?random=2",
      story: "A local community initiative to build a library and provide educational resources to underprivileged children."
    },
    donationOptions: [
      { amount: 500, impact: "Rs 500 can buy 5 books for the library." },
      { amount: 1000, impact: "Rs 1000 can buy desks and chairs for students." },
      { amount: 2500, impact: "Rs 2500 can provide a month of educational materials." },
      { amount: 5000, impact: "Rs 5000 can fund library events and workshops." }
    ],
    disaster: null, // Not a disaster campaign
    milestones: [
      { id: 1, title: "Buy books for the library", target: 10000, achieved: 4000, status: "in-progress" },
      { id: 2, title: "Purchase desks and chairs", target: 20000, achieved: 8000, status: "in-progress" },
      { id: 3, title: "Organize educational workshops", target: 20000, achieved: 3000, status: "in-progress" }
    ]
  },
  {
    id: "np006",
    title: "Health Camp for Rural Villages",
    category: "health",
    district: "Dhading",
    province: "Bagmati Province",
    lat: 27.9244,
    lng: 85.1750,
    status: "active",
    affectedPeople: 250,
    fundRaised: 20000,
    fundTarget: 60000,
    heroImage: "https://picsum.photos/800/400?random=3",
    beneficiary: {
      name: "Dhading Community",
      profileImage: "https://picsum.photos/80/80?random=3",
      story: "Providing health checkups, medicines, and medical guidance to underserved rural communities."
    },
    donationOptions: [
      { amount: 500, impact: "Rs 500 can cover medicines for 10 people." },
      { amount: 1000, impact: "Rs 1000 can cover basic health checkups." },
      { amount: 2500, impact: "Rs 2500 can provide vaccines for 50 people." },
      { amount: 5000, impact: "Rs 5000 can fund a health camp in one village." }
    ],
    disaster: null, // Not a disaster
    milestones: [
      { id: 1, title: "Medicine distribution", target: 10000, achieved: 4000, status: "in-progress" },
      { id: 2, title: "Health checkups", target: 25000, achieved: 12000, status: "in-progress" },
      { id: 3, title: "Vaccination program", target: 25000, achieved: 4000, status: "in-progress" }
    ]
  }
]

export { campaignsData }
