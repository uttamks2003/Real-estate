import React, { useState, useEffect } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  const isSignUpPage = location.pathname === "/sign-up";
  const isSignInPage = location.pathname === "/sign-in";
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setSearchTerm("");
    if (menuOpen) setMenuOpen(false); // Close menu on submit
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    } else {
      setSearchTerm("");
    }
  }, [location.search]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#profile-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      setDropdownOpen(false);
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success == false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      alert("User signed out successfully");
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(data.message));
    }
  };
  // Determine active link
  const getLinkClasses = (path) => {
    return location.pathname === path
      ? "text-green-500 font-semibold"
      : "text-gray-700 hover:text-green-500";
  };

  return (
    <header className="bg-white shadow-md top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="font-bold text-lg sm:text-2xl flex">
              <span className="text-green-500 mr-1">Apna</span>
              <span className="text-gray-800">Ghar</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className={getLinkClasses("/")}>
              Home
            </Link>
            {currentUser && (
              <Link
                to="/create-listing"
                className={getLinkClasses("/create-listing")}
              >
                Create Listing
              </Link>
            )}
            <Link to="/about" className={getLinkClasses("/about")}>
              About
            </Link>
            <Link to="/contact" className={getLinkClasses("/contact")}>
              Contact
            </Link>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                name="search"
                id="search"
                className="w-32 sm:w-64 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 text-gray-600 hover:text-green-500"
                aria-label="Submit Search"
              >
                <FaSearch />
              </button>
            </form>
            {currentUser ? (
              <div className="relative" id="profile-dropdown">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <img
                    className="rounded-full h-8 w-8 object-cover"
                    src={currentUser.avatar}
                    alt="profile"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {isSignInPage ? (
                  <Link
                    to="/sign-up"
                    className="text-gray-700 hover:text-green-500"
                  >
                    Sign Up
                  </Link>
                ) : isSignUpPage ? (
                  <Link
                    to="/sign-in"
                    className="text-gray-700 hover:text-green-500"
                  >
                    Sign In
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/sign-in"
                      className="text-gray-700 hover:text-green-500"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-gray-700 hover:text-green-500"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <form onSubmit={handleSubmit} className="relative mr-2">
              <input
                type="text"
                name="search"
                id="mobile-search"
                className="w-24 sm:w-32 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 text-gray-600 hover:text-green-500"
                aria-label="Submit Search"
              >
                <FaSearch size={14} />
              </button>
            </form>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-green-500 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="px-4 pt-2 pb-4 space-y-1">
            <Link
              to="/"
              className={`block px-2 py-1 rounded-md ${
                location.pathname === "/"
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-green-100"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            {currentUser && (
              <Link
                to="/create-listing"
                className={`block px-2 py-1 rounded-md ${
                  location.pathname === "/create-listing"
                    ? "bg-green-500 text-white"
                    : "text-gray-700 hover:bg-green-100"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Create Listing
              </Link>
            )}
            <Link
              to="/about"
              className={`block px-2 py-1 rounded-md ${
                location.pathname === "/about"
                  ? "bg-green-500 text-white"
                  : "text-gray-700 hover:bg-green-100"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="block px-2 py-1 rounded-md text-gray-700 hover:bg-green-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-2 py-1 rounded-md text-gray-700 hover:bg-green-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {isSignInPage ? (
                  <Link
                    to="/sign-up"
                    className="text-gray-700 hover:text-green-500"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                ) : isSignUpPage ? (
                  <Link
                    to="/sign-in"
                    className="text-gray-700 hover:text-green-500"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                ) : (
                  <div className="flex flex-col">
                    <Link
                      to="/sign-in"
                      className="text-gray-700 hover:text-green-500"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-gray-700 hover:text-green-500"
                      onClick={() => setMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
