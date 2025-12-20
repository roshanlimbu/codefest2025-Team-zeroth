import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Menu, X, LogOut, User } from "lucide-react";
import { navMenu, authMenu } from "../constant/navMenu";
import { HOW_IT_WORKS_ROUTE  } from "../constant/routes";
import { HOME_ROUTE, LOGIN_ROUTE, DASHBOARD_ROUTE } from "../constant/routes";
import useProfileCheck from "../hooks/useProfileCheck";
import axiosClient from "../api/axiosClient";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useProfileCheck();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("csrfToken");
            localStorage.removeItem("user");
        } catch {}

        try {
            document.cookie.split(";").forEach(c => {
                document.cookie =
                    c.trim().split("=")[0] +
                    "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
            });
        } catch {}

        try {
            await axiosClient.post("/logout");
        } catch {} 
        finally {
            navigate(HOME_ROUTE);
            window.location.reload();
        }
    };

    const navLinkClass = ({ isActive }) =>
        `text-sm font-medium px-3 py-2 rounded-md transition-colors ${
            isActive
                ? "text-teal-700 bg-teal-700/10"
                : "text-stone-600 hover:text-teal-700 hover:bg-teal-700/5"
        }`;

    // Custom scroll for How it Works
    const handleNavClick = (route, e) => {
        if (route === HOW_IT_WORKS_ROUTE) {
            e.preventDefault();
            const el = document.getElementById("how-it-works");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            } else {
                // If not on home, go home and scroll after load
                navigate(HOME_ROUTE);
                setTimeout(() => {
                    const el2 = document.getElementById("how-it-works");
                    if (el2) el2.scrollIntoView({ behavior: "smooth" });
                }, 600);
            }
        }
    };

    return (
        <nav className="bg-[#FBF7ED] border-b border-stone-200 sticky top-0 z-50">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* Logo */}
                    <Link to={HOME_ROUTE} className="flex items-center gap-2">
                        <img
                            src="/image.png"
                            alt="We Raise It"
                            className="w-19 h-19 object-contain flex-shrink-0"
                        />
                        <span className="text-emerald-800 font-semibold text-lg">
                            We Raise It
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navMenu.map(link => (
                            <NavLink
                                key={link.label}
                                to={link.route}
                                className={navLinkClass}
                                onClick={e => handleNavClick(link.route, e)}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Search & Auth */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input
                                type="text"
                                placeholder="Search campaigns..."
                                className="pl-10 pr-4 py-2 rounded-full border border-stone-300 bg-[#FBF7ED] text-sm focus:ring-2 focus:ring-teal-700/30 focus:outline-none w-52"
                            />
                        </div>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    to={DASHBOARD_ROUTE}
                                    className="flex items-center gap-2 px-4 py-2 text-stone-700 hover:text-teal-700 rounded-md hover:bg-teal-700/5"
                                >
                                    <User className="w-4 h-4" />
                                    {user.name}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 text-stone-700 hover:text-red-600 rounded-md hover:bg-red-500/5"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                {authMenu.map(link => (
                                    <Link
                                        key={link.label}
                                        to={link.route}
                                        className={
                                            link.label === "Sign Up"
                                                ? "bg-gradient-to-r from-teal-700 to-emerald-700 text-white px-5 py-2 rounded-md text-sm font-semibold shadow hover:opacity-90"
                                                : "px-4 py-2 text-stone-700 hover:text-teal-700 rounded-md hover:bg-teal-700/5"
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-stone-200"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-stone-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-stone-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden transition-all duration-300 overflow-hidden ${
                        isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="py-4 border-t border-stone-200 space-y-3">
                        {navMenu.map(link => (
                            <NavLink
                                key={link.label}
                                to={link.route}
                                onClick={() => setIsMenuOpen(false)}
                                className={navLinkClass}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
