// HomePage.jsx
import React from "react";
import HeroSection from "../components/HeroSection";
import TopDonors from "../components/donation/TopDonors";

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Top Donors (visible to all) */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <TopDonors limit={6} />
        </div>
      </section>

      {/* Impactful Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-12">
            Voices of Impact: How "We Raise It" Transforms Lives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-gray-100 border border-blue-200 rounded-2xl p-8 shadow-lg text-center">
              <p className="text-gray-700 text-base italic mb-6">
                "Through We Raise It, my contribution became a catalyst for real change. The platform’s transparency empowered me to give with confidence and see the difference I made."
              </p>
              <div className="font-bold text-blue-900">Hari Shrestha</div>
              <div className="text-blue-600 text-xs mt-1">Verified Donor</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-gray-100 border border-green-200 rounded-2xl p-8 shadow-lg text-center">
              <p className="text-gray-700 text-base italic mb-6">
                "Our campaign soared to new heights thanks to We Raise It. Supporters rallied behind us, trusting every rupee was making a difference and every story was heard."
              </p>
              <div className="font-bold text-green-900">Rakesh Niraula</div>
              <div className="text-green-600 text-xs mt-1">Campaign Organizer</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-gray-100 border border-yellow-200 rounded-2xl p-8 shadow-lg text-center">
              <p className="text-gray-700 text-base italic mb-6">
                "Giving on We Raise It is deeply personal and profoundly rewarding. I feel connected to every cause, knowing my support truly matters."
              </p>
              <div className="font-bold text-yellow-900">Kapil Tamang</div>
              <div className="text-yellow-600 text-xs mt-1">Philanthropist</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
