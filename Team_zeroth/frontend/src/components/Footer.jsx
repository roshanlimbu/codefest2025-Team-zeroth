import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const footerLinks = {
  about: {
    title: "About",
    links: [
      { label: "Our Mission", to: "/our-mission" },
      { label: "Team", to: "/team" },
      { label: "Partners", to: "/partners" },
      { label: "Careers", to: "/careers" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Help Center", to: "/help-center" },
      { label: "Contact Us", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Service", to: "/terms" },
    ],
  },
  campaigns: {
    title: "Campaigns",
    links: [
      { label: "Start a Campaign", to: "/start-campaign" },
      { label: "Find a Campaign", to: "/find-campaign" },
      { label: "Transparency Dashboard", to: "/transparency" },
    ],
  },
};

// Add brand colors for hover
const socialLinks = [
  { icon: Facebook, href: "#", color: "#1877F2" },
  { icon: Twitter, href: "#", color: "#1DA1F2" },
  { icon: Instagram, href: "#", color: "#E1306C" },
  { icon: Linkedin, href: "#", color: "#0A66C2" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/image.png"
                alt="We Raise It"
                      className="w-8 h-8 object-contain flex-shrink-0"
              />
              <span className="text-orange-500 font-semibold text-lg">
                We Raise It
              </span>
            </Link>

            <p className="text-gray-600 text-sm mb-6 max-w-xs">
              Connecting hearts to relief. Transparency, trust, and community
              support for disaster recovery.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  to={social.href}
                  className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors"
                  style={{ transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = social.color;
                    e.currentTarget.style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#E5E7EB"; // Tailwind gray-200
                    e.currentTarget.style.color = "#4B5563"; // Tailwind gray-600
                  }}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-gray-900 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-gray-600 text-sm hover:text-orange-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            © 2025 We Raise It. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
