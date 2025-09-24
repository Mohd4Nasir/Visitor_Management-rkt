import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../Store/authSlice";

const Header = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.auth.user);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("authToken");
        window.location.href = "/login";
    };

    return (
        <header className="sticky top-0 left-0 w-full bg-white shadow-md z-50">
            <div className="flex items-center justify-between h-16 px-6">
                {/* Left side: Logo + App name */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full border-2 border-gray-200 flex items-center justify-center mr-3 font-medium">
                        <span className="text-lg text-[#4FB7B3]">VM</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-800">
                        Visitor Management
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex space-x-6 ml-10">
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `hover:text-gray-800 ${isActive ? "text-[#4FB7B3] font-semibold" : "text-gray-600"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/visitors"
                        className={({ isActive }) =>
                            `hover:text-gray-800 ${isActive ? "text-[#4FB7B3] font-semibold" : "text-gray-600"
                            }`
                        }
                    >
                        Visitors
                    </NavLink>

                    <NavLink
                        to="/hosts"
                        className={({ isActive }) =>
                            `hover:text-gray-800 ${isActive ? "text-[#4FB7B3] font-semibold" : "text-gray-600"
                            }`
                        }
                    >
                        User
                    </NavLink>
                </nav>

                {/* Right side: user info / profile dropdown */}
                <div className="relative flex items-center" ref={dropdownRef}>
                    {currentUser ? (
                        <div>
                            <div
                                className="flex items-center space-x-2 cursor-pointer"
                                onClick={toggleDropdown}
                            >
                                <span className="text-gray-700 hidden sm:block">
                                    <strong>{currentUser.userName}</strong>
                                </span>

                                <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden border-2 border-gray-300 hover:border-[#4FB7B3] transition-colors">
                                    {currentUser.avatarUrl ? (
                                        <img
                                            src={currentUser.avatarUrl}
                                            alt="avatar"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="flex items-center justify-center h-full w-full text-gray-600 font-medium text-lg">
                                            {currentUser.userName[0].toUpperCase()}
                                        </span>
                                    )}
                                </div>

                                <svg
                                    className={`w-4 h-4 text-gray-600 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>

                            {/* Dropdown menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-20 border border-gray-200">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm font-medium text-gray-900">
                                            {currentUser.userName}
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            {currentUser.email}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Role: {currentUser.role}
                                        </p>
                                    </div>

                                    {/* <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Profile Settings
                                    </Link> */}
                                    {/* <Link
                                        to="/preferences"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Preferences
                                    </Link> */}

                                    <div className="border-t border-gray-100 my-1"></div>

                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsDropdownOpen(false);
                                        }}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="text-gray-600 hover:text-gray-800 font-medium"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
