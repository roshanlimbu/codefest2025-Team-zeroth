import { useState } from 'react';
import { Users, Check, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        {/* Left Panel - Orange */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-12 text-white shadow-2xl">
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-white rounded-xl p-2">
              <Users className="w-8 h-8 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold">We Raise It</h1>
          </div>

          <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
          
          <p className="text-lg mb-12 text-orange-50">
            Start your journey in creating transparent, AI-verified disaster relief campaigns.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-orange-400 rounded-full p-2 mt-1">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">AI-Verified Campaigns</h3>
                <p className="text-orange-50">Automated verification for trust</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-orange-400 rounded-full p-2 mt-1">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Blockchain Transparency</h3>
                <p className="text-orange-50">Every transaction recorded</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-orange-400 rounded-full p-2 mt-1">
                <Check className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">Direct Impact</h3>
                <p className="text-orange-50">Milestone-based fund release</p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-orange-400">
            <p className="text-orange-50">
              Join 150,000+ families already helped through our platform
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="bg-white rounded-3xl p-12 shadow-xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-500">Fill in your details to get started</p>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>

            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600 font-semibold">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}