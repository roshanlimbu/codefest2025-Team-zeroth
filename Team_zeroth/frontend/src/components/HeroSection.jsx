import { Cpu, Link2, Award, CheckSquare } from "lucide-react";
import AboutUs from "./AboutUs";
import { useNavigate } from "react-router-dom";
import { CAMPAIGN_CREATE_ROUTE, CAMPAIGN_ROUTE, LOGIN_ROUTE } from "../constant/routes";

const features = [
  {
    icon: Cpu,
    title: "Verified Campaigns",
    description: "Every campaign goes through strict verification to ensure genuine need.",
  },
  {
    icon: Award,
    title: "Milestone-Based Support",
    description: "Donations are utilized step by step with clear progress updates.",
  },
  {
    icon: CheckSquare,
    title: "Community Trust",
    description: "Built on transparency, accountability, and shared responsibility.",
  },
];

const stats = [
  { value: "1000 +", label: "Families Helped" },
  { value: "Rs 50,000+", label: "Funds Shared Transparently" },
  { value: "98%+", label: "Trusted Campaigns" },
];

const HeroSection = () => {
  const navigate = useNavigate();

  const isAuthenticated = true; // temp local
  const userRole = "";   // temp local

  const handleStartCampaign = () => {
    if (!isAuthenticated) {
      alert("You need to log in to start a campaign.");
      navigate(LOGIN_ROUTE);
      return;
    }

 
    navigate(CAMPAIGN_CREATE_ROUTE);
  };

  const handleSupportVictim = (e) => {
    e.preventDefault();
    navigate(CAMPAIGN_ROUTE);
  };

  return (
    <main>
      {/* Hero */}
      <section
        className="relative min-h-[500px] lg:min-h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            `url("https://images.pexels.com/photos/6646862/pexels-photo-6646862.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260")`,
        }}
      >
        <div className="absolute inset-0 bg-emerald-900/60" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Helping Nepal Rebuild Lives Together
          <br />
          <span className="block text-xl md:text-2xl font-medium text-emerald-200 mt-2">
            When disaster strikes, hope is born from unity. <br />
            Stand with families, restore dreams, and be the reason someone believes in tomorrow.
          </span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartCampaign}
              className=" hover:cursor-pointer bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-800 transition-colors"
            >
              Start a Campaign
            </button>
            <button
              onClick={handleSupportVictim}
              className="hover:cursor-pointer bg-white text-stone-800 px-6 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors border border-stone-200"
            >
              Browse Campaigns
            </button>
          </div>
        </div>
      </section>


      {/* Features */}
      <section id="how-it-works" className="py-16 lg:py-24 bg-[#FBF7ED]">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-stone-800 mb-6">
            Four simple steps to help the ones in need
          </h2>
          <p className="text-center text-stone-600 mb-8 max-w-2xl mx-auto">
            From sharing your story to making real impact, we guide you at every step.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "Step 1",
                title: "Create your campaign",
                desc: "Define your goal, timeline, and how support will help.",
                icon: Cpu,
              },
              {
                step: "Step 2",
                title: "Share with others",
                desc: "Reach friends, family, and communities across Nepal.",
                icon: Link2,
              },
              {
                step: "Step 3",
                title: "Build trust",
                desc: "Post updates and show progress openly to supporters.",
                icon: Award,
              },
              {
                step: "Step 4",
                title: "Receive support",
                desc: "Access funds securely for the purpose you shared.",
                icon: CheckSquare,
              },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div
                key={step}
                className="bg-white border border-stone-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-emerald-50 rounded-md flex items-center justify-center">
                  <Icon className="w-5 h-5 text-emerald-700" />
                </div>
                <div className="text-sm text-stone-500 uppercase mb-1">
                  {step}
                </div>
                <h3 className="font-semibold text-stone-800 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-stone-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 lg:py-24 bg-emerald-800">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-white mb-12">
            Our Impact Across Nepal
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-8 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-emerald-700 mb-2">
                  {stat.value}
                </div>
                <div className="text-stone-600 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-[#FBF7ED]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-emerald-700 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Start Your Journey
              </h3>
              <p className="text-white/90 mb-6 text-sm">
                Share your story and let the community stand with you.
              </p>
              <button className=" hover:cursor-pointer bg-white text-stone-800 px-6 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors">
                Start a Campaign
              </button>
            </div>

            <div className=" bg-emerald-800 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-3">
                Make a Difference
              </h3>
              <p className="text-white/90 mb-6 text-sm">
                Support families in need and be part of meaningful change.
              </p>
              <button className="hover:cursor-pointer bg-white text-stone-800 px-6 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors">
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
