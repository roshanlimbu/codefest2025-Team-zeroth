import { Cpu, Link2, Award, CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CAMPAIGN_ROUTE } from "../constant/routes";

const features = [
  {
    icon: Cpu,
    title: "AI Verification",
    description: "Advanced AI ensures every victim and milestone is rigorously validated.",
  },
  {
    icon: Link2,
    title: "Blockchain Transparency",
    description: "Track every donation from contributor to impact, securely and openly.",
  },
  {
    icon: Award,
    title: "Milestone-Based Funding",
    description: "Funds are released only as verified progress milestones are achieved.",
  },
  {
    icon: CheckSquare,
    title: "Donor Governance",
    description: "Empowering donors to vote on fund utilization for completed milestones.",
  },
];

const stats = [
  { value: "150,000+", label: "Families Helped" },
  { value: "$2.5M+", label: "Funds Released Transparently" },
  { value: "99%", label: "AI-Verified Campaigns" },
];

const HeroSection = () => {

  const navigate = useNavigate();

  const isAuthenticated = true; // temp local
  const userRole = "creator";   // temp local

  const handleStartCampaign = () => {
    if (!isAuthenticated) {
      // User not logged in
      alert("You need to log in to start a campaign.");
      navigate("/login"); // redirect to login page
      return;
    }

    if (userRole !== "creator") {
      // User logged in but not allowed to create
      alert("Only verified campaign creators can start a campaign.");
      return;
    }

    // Passed all checks, navigate to campaign creation page
    navigate(CAMPAIGN_ROUTE);
  };

  // Handle Donate button click
  const handleSupportVictim = (e) => {
    e.preventDefault();
    console.log("campaign route")
    navigate(CAMPAIGN_ROUTE);
  };


  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[500px] lg:min-h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url("https://images.pexels.com/photos/6646862/pexels-photo-6646862.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Together, We Raise Lives Again.
          </h1>
          <p className="text-white/90 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            An AI-verified, blockchain-transparent platform for milestone-based disaster crowdfunding.
            Empowering direct impact and community trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-500/90 transition-colors" onClick={handleStartCampaign}>
              Start a Campaign
            </button>
            <button onClick={handleSupportVictim} className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors border border-gray-200">
              Support a Victim
            </button>
          </div>
        </div>
      </section>

        {/* Features */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            How We Build Trust and Transparency
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-orange-500" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
 