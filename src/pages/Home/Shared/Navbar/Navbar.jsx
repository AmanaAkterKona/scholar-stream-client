import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaGraduationCap } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((error) => console.log(error));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <nav className="bg-[#033044] text-white py-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 select-none group">
          <div className="bg-gradient-to-br from-[#D4AF37] to-[#FFD700] p-1 rounded-full text-black flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg">
            <FaGraduationCap
              size={28}
              className="transition-all duration-500 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.8)]"
            />
          </div>

          <h2 className="text-4xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 transition-all duration-500 group-hover:animate-shimmer relative">
            SCHOLAR
            <span className="absolute text-xl md:text-2xl font-bold text-[#37c4ef] top-7 right-1 -translate-x-1/4 translate-y-1/4 bg-clip-text text-transparent bg-gradient-to-r from-[#37c4ef] via-[#6fc9f5] to-[#a0d4ff] animate-shimmer">
              Stream
            </span>
          </h2>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">

          <NavLink to="/" className="hover:text-[#D4AF37] duration-300">Home</NavLink>
          <NavLink to="/scholarships" className="hover:text-[#D4AF37] duration-300">All Scholarships</NavLink>

         
          {/* Not Logged In */}
          {!user && (
            <>
              <Link
                to="/login"
                className="border border-[#D4AF37] px-4 py-1 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#D4AF37] px-4 py-1 rounded-lg text-black font-semibold hover:bg-white duration-300"
              >
                Register
              </Link>
            </>
          )}

          {/* Logged In (Profile Dropdown Click) */}
          {user && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img
                  src={user.photoURL}
                  className="w-10 h-10 rounded-full border-2 border-[#D4AF37] cursor-pointer"
                  alt="profile"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 bg-[#022736] p-4 rounded-lg shadow-lg w-40 z-50">
                  <Link to="/dashboard" className="block py-1 hover:text-[#D4AF37]">
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-1 hover:text-[#D4AF37]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#033044] text-white px-6 py-4 flex flex-col gap-4">

          <NavLink to="/" className="hover:text-[#D4AF37] duration-300">Home</NavLink>
          <NavLink to="/scholarships" className="hover:text-[#D4AF37] duration-300">All Scholarships</NavLink>

          {user && (
            <>
              <NavLink to="/dashboard" className="hover:text-[#D4AF37] duration-300">
                Dashboard
              </NavLink>

             

              <button
                onClick={handleLogout}
                className="hover:text-[#D4AF37] duration-300 text-left"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <>
              <Link
                to="/login"
                className="border border-[#D4AF37] px-4 py-2 rounded-lg text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-[#D4AF37] px-4 py-2 rounded-lg text-black font-semibold hover:bg-white duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
