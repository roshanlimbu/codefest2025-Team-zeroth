import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { navMenu, authMenu } from "../constant/navMenu";
import { HOME_ROUTE } from "../constant/routes";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinkClass = ({ isActive }) =>
        `text-sm font-medium transition-colors px-3 py-2 rounded-md ${isActive
            ? "text-orange-500 bg-orange-500/10"
            : "text-gray-600 hover:text-orange-500 hover:bg-orange-500/5"
        }`;

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to={HOME_ROUTE} className="flex items-center gap-2 group">
                        <div className="w-9 h-9 bg-linear-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <span className="text-white font-bold text-xl">W</span>
                        </div>
                        <span className="text-orange-500 font-semibold text-lg tracking-tight">
                            We Raise It
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navMenu.map((link) => (
                            <NavLink
                                key={link.label}
                                to={link.route}
                                className={navLinkClass}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Search & Auth */}
                    <div className="hidden md:flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search campaigns..."
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 w-52 transition-all placeholder:text-gray-400"
                            />
                        </div>
                        {authMenu.map((authLink) => (
                            <Link
                                key={authLink.label}
                                to={authLink.route}
                                className={
                                    authLink.label === "Sign Up"
                                        ? "bg-linear-to-r from-orange-500 to-amber-500 text-white px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity shadow-md hover:shadow-lg"
                                        : "px-4 py-2 text-gray-700 hover:text-orange-500 transition-colors text-sm font-medium rounded-md hover:bg-orange-500/5"
                                }
                            >
                                {authLink.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="py-4 border-t border-gray-200">
                        <div className="flex flex-col gap-1">
                            {navMenu.map((link) => (
                                <NavLink
                                    key={link.label}
                                    to={link.route}
                                    className={navLinkClass}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 px-1 space-y-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search campaigns..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500"
                                />
                            </div>

                            <div className="flex gap-3">
                                {authMenu.map((authLink) => (
                                    // console.log(authLink.route),

                                    <Link
                                        key={authLink.label}
                                        to={authLink.route}
                                        className={`flex-1 text-center py-2.5 rounded-full text-sm font-medium ${authLink.label === "Sign Up"
                                            ? "bg-linear-to-r from-orange-500 to-amber-500 text-white font-semibold hover:opacity-90 transition-opacity"
                                            : "text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
                                            }`}
                                    >
                                        {authLink.label}
                                    </Link>
                                ))}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
