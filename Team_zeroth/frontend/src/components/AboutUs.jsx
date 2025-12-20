import React from "react";

const AboutUs = () => (
  <section className="py-12 px-4 bg-[#F8FAFC] rounded-xl shadow-sm mb-10 border border-gray-100">
    <div className="max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-extrabold mb-4 text-gray-900 tracking-tight">About Us</h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-2">
        We are a passionate team dedicated to making donations <span className="text-emerald-700 font-semibold">transparent</span>, <span className="text-emerald-700 font-semibold">impactful</span>, and <span className="text-emerald-700 font-semibold">trustworthy</span>.
      </p>
      <p className="text-base text-gray-600 max-w-2xl mx-auto">
        Our platform connects donors and campaigners, ensuring every contribution is tracked and every milestone is verified. Join us in building a better, more transparent future for giving!
      </p>
    </div>
  </section>
);

export default AboutUs;
