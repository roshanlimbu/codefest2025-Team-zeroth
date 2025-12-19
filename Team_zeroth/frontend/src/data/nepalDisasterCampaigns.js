const nepalCampaigns = [
  {
    "id": "np001",
    "title": "Sindhupalchok Landslide Emergency Aid",
    "disasterType": "Landslide",
    "district": "Sindhupalchok",
    "province": "Bagmati Province",
    "lat": 27.8731,
    "lng": 85.8288,
    "status": "active",
    "affectedPeople": 85,
    "fundRaised": 45000,
    "fundTarget": 120000,
    "heroImage": "/placeholder.svg?height=400&width=800",
    "beneficiary": {
      "name": "सरिता गुरुङ (Sarita Gurung)",
      "profileImage": "/placeholder.svg?height=80&width=80",
      "story": "सरिता, तीन बच्चाहरूकी आमा, सिन्धुपाल्चोकमा हालैको पहिरोमा आफ्नो घर गुमाउनुभयो। उनको परिवार अहिले अस्थायी शरणस्थलमा बसिरहेको छ, खाना, सफा पानी र औषधि जस्ता आधारभूत आवश्यकताहरू पूरा गर्न संघर्ष गरिरहेको छ। तपाईंको समर्थनले सरिता र उनका बच्चाहरूलाई आफ्नो जीवन पुनर्निर्माण गर्न, सुरक्षित घर र उनका बच्चाहरूका लागि शिक्षाको पहुँचबाट सुरु गर्न प्रत्यक्ष मद्दत गर्नेछ।"
    },
    "donationOptions": [
      { "amount": 500, "impact": "तपाईंको रु ५०० दानले दुई परिवारलाई तीन दिनको लागि खाना खुवाउन सक्छ।" },
      { "amount": 1000, "impact": "तपाईंको रु १,००० दानले १० परिवारलाई एक हप्ताको लागि सफा पानी प्रदान गर्न सक्छ।" },
      { "amount": 2500, "impact": "तपाईंको रु २,५०० दानले एक परिवारको लागि अस्थायी आश्रय सामग्री प्रदान गर्न सक्छ।" },
      { "amount": 5000, "impact": "तपाईंको रु ५,००० दानले २५ परिवारहरूको लागि चिकित्सा आपूर्ति प्रदान गर्न सक्छ।" }
    ],
    "disaster": {
      "location": "Sindhupalchok District, Bagmati Province, Nepal",
      "type": "Landslide",
      "immediateNeeds": ["Emergency Shelter", "Food & Water", "Medical Supplies", "Reconstruction Materials"],
      "image": "/placeholder.svg?height=300&width=600"
    },
    "milestones": [
      {
        "id": 1,
        "title": "५० परिवारका लागि आपतकालीन खाना र पानी प्रदान गर्नुहोस्",
        "target": 25000,
        "achieved": 15000,
        "status": "in-progress"
      },
      {
        "id": 2,
        "title": "२० परिवारका लागि अस्थायी आश्रय स्थापना गर्नुहोस्",
        "target": 35000,
        "achieved": 18000,
        "status": "in-progress"
      },
      {
        "id": 3,
        "title": "चिकित्सा आपूर्ति र स्वच्छता किटहरू वितरण गर्नुहोस्",
        "target": 20000,
        "achieved": 12000,
        "status": "in-progress"
      },
      { "id": 4, "title": "५ क्षतिग्रस्त घरहरूको पुनर्निर्माण सुरु गर्नुहोस्", "target": 40000, "achieved": 0, "status": "pending" }
    ]
  },
  {
    "id": "np002",
    "title": "Jhapa Flood Relief Campaign",
    "disasterType": "Flood",
    "district": "Jhapa",
    "province": "Koshi Province",
    "lat": 26.5455,
    "lng": 88.079,
    "status": "active",
    "affectedPeople": 210,
    "fundRaised": 32000,
    "fundTarget": 100000,
    "heroImage": "/placeholder.svg?height=400&width=800",
    "beneficiary": {
      "name": "राम बहादुर राई (Ram Bahadur Rai)",
      "profileImage": "/placeholder.svg?height=80&width=80",
      "story": "राम, झापाका एक किसान, हालैको बाढीमा आफ्नो खेत र घर गुमाए। उनको परिवार अहिले सुरक्षित स्थानमा आश्रय लिइरहेको छ तर तिनीहरूसँग आधारभूत आवश्यकताहरू छैनन्। तपाईंको सहयोगले उनलाई आफ्नो जीवन पुनर्निर्माण गर्न र फेरि खेती सुरु गर्न मद्दत गर्नेछ।"
    },
    "donationOptions": [
      { "amount": 500, "impact": "रु ५०० ले एक परिवारलाई तीन दिनको खाना दिन सक्छ।" },
      { "amount": 1000, "impact": "रु १,००० ले पाँच परिवारलाई सफा पानी दिन सक्छ।" },
      { "amount": 2500, "impact": "रु २,५०० ले अस्थायी आश्रय सामग्री दिन सक्छ।" },
      { "amount": 5000, "impact": "रु ५,००० ले खेती सामग्री र बीउ दिन सक्छ।" }
    ],
    "disaster": {
      "location": "Jhapa District, Koshi Province, Nepal",
      "type": "Flood",
      "immediateNeeds": ["Food & Water", "Shelter", "Medical Aid", "Agricultural Support"],
      "image": "/placeholder.svg?height=300&width=600"
    },
    "milestones": [
      {
        "id": 1,
        "title": "१०० परिवारका लागि आपतकालीन राहत प्याकेज",
        "target": 30000,
        "achieved": 20000,
        "status": "in-progress"
      },
      { "id": 2, "title": "अस्थायी आश्रय निर्माण", "target": 40000, "achieved": 12000, "status": "in-progress" },
      { "id": 3, "title": "कृषि पुनर्स्थापना कार्यक्रम", "target": 30000, "achieved": 0, "status": "pending" }
    ]
  },
  {
    "id": "np003",
    "title": "Kalikot Fire Accident Support",
    "disasterType": "Fire",
    "district": "Kalikot",
    "province": "Karnali Province",
    "lat": 29.2036,
    "lng": 81.6364,
    "status": "active",
    "affectedPeople": 34,
    "fundRaised": 15000,
    "fundTarget": 60000,
    "heroImage": "/placeholder.svg?height=400&width=800",
    "beneficiary": {
      "name": "लक्ष्मी बुढा (Laxmi Budha)",
      "profileImage": "/placeholder.svg?height=80&width=80",
      "story": "लक्ष्मी र उनको परिवार कालिकोटमा आगलागीमा परेर आफ्नो घर र सम्पत्ति गुमाउनुभयो। चार बच्चाहरूसहितको परिवार अहिले नजिकका आफन्तको घरमा बसिरहेको छ। तपाईंको योगदानले तिनीहरूलाई नयाँ जीवन सुरु गर्न मद्दत गर्नेछ।"
    },
    "donationOptions": [
      { "amount": 500, "impact": "रु ५०० ले आधारभूत खाद्यान्न र कपडा दिन सक्छ।" },
      { "amount": 1000, "impact": "रु १,००० ले भान्साका सामग्रीहरू दिन सक्छ।" },
      { "amount": 2500, "impact": "रु २,५०० ले घर निर्माण सामग्री दिन सक्छ।" },
      { "amount": 5000, "impact": "रु ५,००० ले पूर्ण घर पुनर्निर्माणमा योगदान दिन सक्छ।" }
    ],
    "disaster": {
      "location": "Kalikot District, Karnali Province, Nepal",
      "type": "Fire Accident",
      "immediateNeeds": ["Shelter Materials", "Clothing", "Kitchen Supplies", "Medical Care"],
      "image": "/placeholder.svg?height=300&width=600"
    },
    "milestones": [
      { "id": 1, "title": "आपतकालीन राहत र कपडा", "target": 15000, "achieved": 10000, "status": "in-progress" },
      { "id": 2, "title": "अस्थायी आश्रय निर्माण", "target": 25000, "achieved": 5000, "status": "in-progress" },
      { "id": 3, "title": "स्थायी घर पुनर्निर्माण", "target": 20000, "achieved": 0, "status": "pending" }
    ]
  },
  {
    "id": "np004",
    "title": "Lamjung Earthquake Recovery",
    "disasterType": "Earthquake",
    "district": "Lamjung",
    "province": "Gandaki Province",
    "lat": 28.2765,
    "lng": 84.3542,
    "status": "active",
    "affectedPeople": 120,
    "fundRaised": 89000,
    "fundTarget": 200000,
    "heroImage": "/placeholder.svg?height=400&width=800",
    "beneficiary": {
      "name": "विष्णु गुरुङ (Bishnu Gurung)",
      "profileImage": "/placeholder.svg?height=80&width=80",
      "story": "विष्णु, लमजुङका एक वृद्ध किसान, भूकम्पमा आफ्नो पुस्तौंदेखिको घर गुमाए। उनको परिवार र समुदाय पुनर्निर्माणको लागि संघर्ष गरिरहेको छ। तपाईंको सहयोगले उनलाई र उनको समुदायलाई फेरि उभिन मद्दत गर्नेछ।"
    },
    "donationOptions": [
      { "amount": 1000, "impact": "रु १,००० ले राहत सामग्री प्याकेज दिन सक्छ।" },
      { "amount": 2500, "impact": "रु २,५०० ले अस्था���ी आश्रय निर्माण सामग्री दिन सक्छ।" },
      { "amount": 5000, "impact": "रु ५,००० ले घर पुनर्निर्माणमा योगदान दिन सक्छ।" },
      { "amount": 10000, "impact": "रु १०,००० ले भूकम्प प्रतिरोधी घर निर्माण गर्न मद्दत गर्छ।" }
    ],
    "disaster": {
      "location": "Lamjung District, Gandaki Province, Nepal",
      "type": "Earthquake (Magnitude 5.6)",
      "immediateNeeds": ["Emergency Shelter", "Food & Water", "Medical Supplies", "Reconstruction Materials"],
      "image": "/placeholder.svg?height=300&width=600"
    },
    "milestones": [
      { "id": 1, "title": "आपतकालीन राहत वितरण", "target": 50000, "achieved": 50000, "status": "completed" },
      { "id": 2, "title": "अस्थायी आश्रय निर्माण", "target": 70000, "achieved": 39000, "status": "in-progress" },
      { "id": 3, "title": "स्थायी घर पुनर्निर्माण", "target": 80000, "achieved": 0, "status": "pending" }
    ]
  }
]

export { nepalCampaigns }