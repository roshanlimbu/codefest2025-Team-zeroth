import React from 'react';
import { FileText, CheckCircle, Users, Wallet, TrendingUp, Shield } from 'lucide-react';

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: FileText,
      title: 'Create Campaign',
      description: 'Submit your disaster relief project with detailed information, photos, and geo-tagged evidence. Our AI verifies authenticity automatically.',
      color: 'from-orange-400 to-orange-500'
    },
    {
      number: '02',
      icon: CheckCircle,
      title: 'AI Verification',
      description: 'Advanced AI algorithms verify your location, assess damage, and validate your story through multiple data points for maximum transparency.',
      color: 'from-blue-400 to-blue-500'
    },
    {
      number: '03',
      icon: Users,
      title: 'Community Review',
      description: 'The community reviews your campaign and milestones. Donors vote on milestone completion to ensure accountability and trust.',
      color: 'from-green-400 to-green-500'
    },
    {
      number: '04',
      icon: Wallet,
      title: 'Receive Funding',
      description: 'Once milestones are approved by the community, funds are released directly to you via blockchain-verified transactions.',
      color: 'from-purple-400 to-purple-500'
    },
    {
      number: '05',
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Update your progress with photos and receipts. Transparent tracking keeps donors informed and engaged throughout the journey.',
      color: 'from-pink-400 to-pink-500'
    },
    {
      number: '06',
      icon: Shield,
      title: 'Complete Project',
      description: 'Finalize your project with community approval. All transactions are recorded on the blockchain for complete transparency.',
      color: 'from-indigo-400 to-indigo-500'
    }
  ];

  const features = [
    // {
    //   title: 'Blockchain Verified',
    //   description: 'Every transaction is recorded on the blockchain for complete transparency',
    //   icon: '🔗'
    // },
    {
      title: 'AI-Powered Trust',
      description: 'Advanced AI verification ensures authenticity of every campaign',
      icon: '🤖'
    },
    {
      title: 'Community Driven',
      description: 'Community votes on milestones to ensure accountability',
      icon: '👥'
    },
    {
      title: 'Milestone-Based',
      description: 'Funds released in stages based on verified progress',
      icon: '🎯'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            How It Works
          </h1>
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
            A transparent, AI-verified platform that connects disaster relief campaigns with donors through blockchain technology and community trust.
          </p>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple Steps to Make an Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From creating your campaign to completing your project, we've made the process transparent and trustworthy.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 top-32 w-1 h-32 bg-gradient-to-b from-orange-200 to-transparent transform -translate-x-1/2" />
              )}

              <div className={`flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              }`}>
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold text-sm mb-4">
                    STEP {step.number}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                    {step.description}
                  </p>
                </div>

                {/* Icon Circle */}
                <div className="flex-shrink-0">
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl transform transition-all hover:scale-110`}>
                    <step.icon className="w-16 h-16 text-white" />
                  </div>
                </div>

                {/* Placeholder for alternating layout */}
                <div className="flex-1 hidden lg:block" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-white py-20">
        <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose We Raise It?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built on trust, powered by technology, driven by community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center transform transition-all hover:scale-105 hover:shadow-xl">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How Donors Can Help */}
      <div className="bg-gradient-to-br from-gray-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              For Donors
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Support verified campaigns with complete transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Browse Campaigns
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Explore verified disaster relief campaigns with AI-verified authenticity scores and complete transparency.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Donate Securely
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Make donations with confidence knowing every transaction is recorded on the blockchain for full transparency.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Vote on Milestones
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Participate in community voting to approve milestones and ensure your donations create real impact.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-orange-100 mb-10 leading-relaxed">
            Whether you need help or want to help others, start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-xl">
              Start a Campaign
            </button>
            <button className="bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-800 transition-all transform hover:scale-105 shadow-xl border-2 border-orange-400">
              Support a Cause
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-orange-500 mb-2">150K+</div>
              <div className="text-gray-600 font-medium">Families Helped</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-500 mb-2">$2.5M+</div>
              <div className="text-gray-600 font-medium">Funds Released</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-500 mb-2">99%</div>
              <div className="text-gray-600 font-medium">Verification Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-orange-500 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HowItWorks;