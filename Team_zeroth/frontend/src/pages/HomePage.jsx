// HomePage.jsx
import React from "react";
import HeroSection from "../components/HeroSection";

const HomePage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Optional Testimonials Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <p className="text-gray-600 text-sm mb-4">
                "This platform helped us track donations transparently and see real impact!"
              </p>
              <div className="font-semibold text-gray-900">John Doe</div>
              <div className="text-gray-500 text-xs">Verified Donor</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <p className="text-gray-600 text-sm mb-4">
                "AI verification made our campaign trustworthy and boosted supporter confidence."
              </p>
              <div className="font-semibold text-gray-900">Jane Smith</div>
              <div className="text-gray-500 text-xs">Campaign Organizer</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
              <p className="text-gray-600 text-sm mb-4">
                "Finally, a platform where donors feel in control and connected to impact."
              </p>
              <div className="font-semibold text-gray-900">Ali Khan</div>
              <div className="text-gray-500 text-xs">Philanthropist</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
