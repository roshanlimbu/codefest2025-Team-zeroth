import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { REGISTER_ROUTE } from "../constant/routes";

export default function Login() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const res = await loginUser({
                email: formData.email,
                password: formData.password,
            });

            if (res.csrfToken) {
                localStorage.setItem("csrfToken", res.csrfToken);
            }

            if (res.user && res.user.type) {
                localStorage.setItem("auth_role", res.user.type);
            }

            localStorage.setItem("auth_token", "1");

            const role = res.user?.type || localStorage.getItem("auth_role");
            if (role === "ADMIN") {
                navigate("/admin/dashboard");
                window.location.href = "/admin/dashboard";
            } else {
                navigate("/dashboard");
                window.location.href = "/dashboard";
            }
        } catch (err) {
            setError(err.error || err.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FBF7ED] flex items-center justify-center p-4">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">

                {/* LEFT PANEL */}
                <div className="hidden lg:block">
                    <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-3xl p-12 text-white shadow-2xl">

                        <div className="flex items-center space-x-3 mb-8">
                            <div className="bg-white p-3 rounded-xl">
                                <svg
                                    className="w-8 h-8 text-emerald-700"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z"
                                    />
                                </svg>
                            </div>
                            <span className="text-3xl font-bold">
                                We Raise It
                            </span>
                        </div>

                        <h2 className="text-4xl font-bold mb-6">
                            Welcome Back
                        </h2>

                        <p className="text-emerald-100 text-lg mb-8">
                            Continue supporting families and communities across Nepal.
                            Every contribution begins with people like you.
                        </p>

                        <div className="space-y-4">
                            {[
                                ["Trusted Campaigns", "Every story is verified before reaching donors"],
                                ["Community Support", "Help reaches people when they need it most"],
                            ].map(([title, desc]) => (
                                <div key={title} className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold">{title}</h3>
                                        <p className="text-emerald-100 text-sm">
                                            {desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-emerald-600">
                            <p className="text-emerald-100 text-sm">
                                Together, we have already helped thousands of families.
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT LOGIN FORM */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-stone-800 mb-2">
                            Sign In
                        </h1>
                        <p className="text-stone-600">
                            Access your account and continue making a difference
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div>
                            <label className="block text-stone-700 font-medium mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-stone-700 font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 border-2 border-stone-200 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-stone-400" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-stone-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 rounded-lg font-semibold text-lg transition-all shadow-lg mt-6 flex items-center justify-center gap-2 disabled:bg-emerald-400"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-stone-600">
                            Don&apos;t have an account?{" "}
                            <Link
                                to={REGISTER_ROUTE}
                                className="text-emerald-700 hover:text-emerald-800 font-semibold"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
