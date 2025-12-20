import { Cpu, Link2, Award, CheckSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CAMPAIGN_CREATE_ROUTE, CAMPAIGN_ROUTE, LOGIN_ROUTE } from "../constant/routes";

const features = [
  {
    icon: Cpu,
    title: "AI Verification",
    description: "Advanced AI ensures every victim and milestone is rigorously validated.",
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
  { value: "Rs 1,50,000+", label: "Families Helped" },
  { value: "Rs 25,00,000+", label: "Funds Released Transparently" },
  { value: "98%+", label: "Verified Campaigns" },
];

const HeroSection = () => {

  const navigate = useNavigate();

  const isAuthenticated = true; // temp local
  const userRole = "creator";   // temp local

  const handleStartCampaign = () => {
    if (!isAuthenticated) {
      // User not logged in
      alert("You need to log in to start a campaign.");
      navigate(LOGIN_ROUTE); // redirect to login page
      return;
    }

    if (userRole !== "creator") {
      // User logged in but not allowed to create
      alert("Only verified campaign creators can start a campaign.");
      return;
    }

    // Passed all checks, navigate to campaign creation page
    navigate(CAMPAIGN_CREATE_ROUTE);
  };

  // Handle Donate button click
  const handleSupportVictim = (e) => {
    e.preventDefault();
    console.log("campaign route")
    navigate(CAMPAIGN_ROUTE);
  };

  // Icons for bento panes
  const LeftIcon = features[0].icon;
  const MidIcon = features[1].icon;
  const RightIcon = features[2].icon;


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
                Browse Campaigns
            </button>
          </div>
        </div>
      </section>

        {/* Features */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">
            Four steps to rally your community
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">From idea to impact, we simplify every stage so you can focus on the cause.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto mb-3 bg-orange-50 rounded-md flex items-center justify-center">
                <Cpu className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-sm text-gray-500 uppercase mb-1">Step 1</div>
              <h3 className="font-semibold text-gray-900 mb-2">Create your campaign</h3>
              <p className="text-sm text-gray-600">Set goals, timelines, and impact milestones with our guided builder.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto mb-3 bg-orange-50 rounded-md flex items-center justify-center">
                <Link2 className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-sm text-gray-500 uppercase mb-1">Step 2</div>
              <h3 className="font-semibold text-gray-900 mb-2">Share everywhere</h3>
              <p className="text-sm text-gray-600">Publish updates, social graphics, and QR posters in multiple languages.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto mb-3 bg-orange-50 rounded-md flex items-center justify-center">
                <Award className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-sm text-gray-500 uppercase mb-1">Step 3</div>
              <h3 className="font-semibold text-gray-900 mb-2">Build trust in real time</h3>
              <p className="text-sm text-gray-600">Track donations, acknowledge supporters, and keep transparency front and center.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 mx-auto mb-3 bg-orange-50 rounded-md flex items-center justify-center">
                <CheckSquare className="w-5 h-5 text-orange-500" />
              </div>
              <div className="text-sm text-gray-500 uppercase mb-1">Step 4</div>
              <h3 className="font-semibold text-gray-900 mb-2">Access funds securely</h3>
              <p className="text-sm text-gray-600">Transfer funds directly to verified bank accounts with detailed payout tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-24 bg-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Our Impact So Far
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-gray-200 rounded-xl p-8 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Cards */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-orange-500 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Start Your Journey
              </h3>
              <p className="text-white/90 mb-6 text-sm">
                Turn your story into a beacon of hope. Launch an AI-verified campaign today.
              </p>
              <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Start a Campaign
              </button>
            </div>
            <div className="bg-green-500 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Make a Difference
              </h3>
              <p className="text-white/90 mb-6 text-sm">
                Support those in need with full transparency. Your donation matters.
              </p>
              <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Find a Cause
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;
 
