import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Check,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  Loader2,
  UserCircle,
} from 'lucide-react';
import { registerUser } from '../api/authApi';
import { OTPVERIFY_ROUTE } from '../constant/routes';

export default function SignupPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 2, // default role: USER
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    terms: '',
  });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await registerUser({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      setSuccess('Registration successful! Redirecting to OTP verification...');

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 2,
      });
      setAgreedToTerms(false);

      // Redirect to OTP verification
      navigate(OTPVERIFY_ROUTE, { state: { email: formData.email } });
    } catch (err) {
      setError(err.error || err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        {/* Left Panel */}
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

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-green-800">{success}</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am registering as
              </label>
              <div className="flex gap-4 mb-2">
                {[
                  { id: 1, label: 'Admin'},
                  { id: 2, label: 'User'},
                  { id: 3, label: 'Donor'},
                ].map((roleOption) => (
                  <button
                    key={roleOption.id}
                    type="button"
                    onClick={() => handleChange('role', roleOption.id)}
                    className={`flex-1 p-4 rounded-lg border text-left transition ${
                      formData.role === roleOption.id
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-orange-500 hover:bg-orange-50'
                    }`}
                  >
                    <h4 className="font-semibold">{roleOption.label}</h4>
                  </button>
                ))}
              </div>
              {errors.role && (
                <p className="text-sm text-red-600">{errors.role}</p>
              )}
            </div>

            {/* Full Name */}
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
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition ${
                    errors.fullName ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
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
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => {
                    setAgreedToTerms(e.target.checked);
                    if (errors.terms) {
                      setErrors((prev) => ({ ...prev, terms: '' }));
                    }
                  }}
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
              {errors.terms && (
                <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <a href="#" className="text-orange-500 hover:text-orange-600 font-semibold">
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
